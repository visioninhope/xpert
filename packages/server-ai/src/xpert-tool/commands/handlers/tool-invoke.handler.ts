import { ToolParameterForm, XpertToolsetCategoryEnum } from '@metad/contracts'
import { RequestContext } from '@metad/server-core'
import { Logger } from '@nestjs/common'
import { CommandBus, CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs'
import { isNil } from 'lodash'
import { Subject } from 'rxjs'
import {
	ApiBasedToolSchemaParser,
	createBuiltinToolset,
	MCPToolset,
	ODataToolset,
	OpenAPIToolset,
	ToolNotSupportedError,
	XpertToolsetService
} from '../../../xpert-toolset'
import { ToolInvokeCommand } from '../tool-invoke.command'

@CommandHandler(ToolInvokeCommand)
export class ToolInvokeHandler implements ICommandHandler<ToolInvokeCommand> {
	readonly #logger = new Logger(ToolInvokeHandler.name)

	constructor(
		private readonly toolsetService: XpertToolsetService,
		private readonly commandBus: CommandBus,
		private readonly queryBus: QueryBus
	) {}

	public async execute(command: ToolInvokeCommand): Promise<any> {
		const tenantId = RequestContext.currentTenantId()
		const organizationId = RequestContext.getOrganizationId()
		// Default enabled tool for invoke
		const tool = { ...command.tool, enabled: true }
		const toolset = tool.toolset

		// Parse parameters types
		const parameters = tool.schema.parameters?.reduce((acc, param) => {
			if (!isNil(tool.parameters?.[param.name])) {
				acc[param.form === ToolParameterForm.FORM ? 'form' : 'llm'][param.name] = ApiBasedToolSchemaParser.convertPropertyValueType(
					param.schema,
					tool.parameters[param.name]
				)
			}
			return acc
		}, {llm: {}, form: {}}) ?? {llm: command.tool.parameters}

		const events = []
		const subscriber = new Subject()

		subscriber.subscribe((event) => events.push(event))

		const toolContext = {
			tenantId,
			organizationId,
			user: RequestContext.currentUser(),
			userId: RequestContext.currentUserId(),
			subscriber
		}

		switch (toolset.category) {
			case XpertToolsetCategoryEnum.BUILTIN: {
				const builtinToolset = createBuiltinToolset(
					toolset.type,
					{
						...toolset,
						tools: [
							{
								...tool,
								enabled: true
							}
						]
					},
					{
						tenantId,
						organizationId,
						toolsetService: this.toolsetService,
						commandBus: this.commandBus,
						queryBus: this.queryBus,
						xpertId: parameters?.form.xpertId,
						agentKey: parameters?.form.agentKey,
					}
				)

				await builtinToolset.initTools()

				const result = await builtinToolset.getTool(tool.name).invoke(parameters?.llm ?? {}, {
					configurable: toolContext
				})

				if (events.length) {
					return {
						events,
						result
					}
				}
				return result
			}
			case XpertToolsetCategoryEnum.API: {
				switch (toolset.type) {
					case 'openapi': {
						const openapiToolset = new OpenAPIToolset({ ...toolset, tools: [tool] })
						const toolRuntime = openapiToolset.getTool(tool.name)
						return await toolRuntime.invoke(parameters.llm, {
							configurable: toolContext
						})
					}

					case 'odata': {
						const openapiToolset = new ODataToolset({ ...toolset, tools: [tool] })
						const toolRuntime = openapiToolset.getTool(tool.name)
						return await toolRuntime.invoke(parameters.llm, {
							configurable: toolContext
						})
					}
				}
				break
			}
			case XpertToolsetCategoryEnum.MCP: {
				const mcpToolset = new MCPToolset({ ...toolset, tools: [tool] })
				await mcpToolset.initTools()
				const toolRuntime = mcpToolset.getTool(tool.name)
				return await toolRuntime.invoke(parameters?.llm, {
					configurable: toolContext
				})
			}
		}

		throw new ToolNotSupportedError(`Toolset type ${toolset.type}`)
	}
}
