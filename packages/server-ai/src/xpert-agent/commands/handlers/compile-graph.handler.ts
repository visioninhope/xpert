import { CompiledStateGraph } from '@langchain/langgraph'
import { channelName, IXpertAgent, TXpertGraph } from '@metad/contracts'
import { Logger, NotFoundException } from '@nestjs/common'
import { CommandBus, CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs'
import { I18nService } from 'nestjs-i18n'
import { GetXpertWorkflowQuery } from '../../../xpert/queries'
import { getSwarmPartners } from '../../agent'
import { CompileGraphCommand } from '../compile-graph.command'
import { XpertAgentSwarmCommand } from '../create-swarm.command'
import { XpertAgentSubgraphCommand } from '../subgraph.command'

@CommandHandler(CompileGraphCommand)
export class CompileGraphHandler implements ICommandHandler<CompileGraphCommand> {
	readonly #logger = new Logger(CompileGraphHandler.name)

	constructor(
		private readonly commandBus: CommandBus,
		private readonly queryBus: QueryBus,
		private readonly i18nService: I18nService
	) {}

	public async execute(command: CompileGraphCommand): Promise<{graph: CompiledStateGraph<any, any, any>; agent: IXpertAgent}> {
		const { agentKeyOrName, xpert, options } = command
		const { rootController } = options

		// Agent & Graph
		const { agent, graph: xpertGraph } = await this.queryBus.execute<
			GetXpertWorkflowQuery,
			{ agent: IXpertAgent; graph: TXpertGraph }
		>(new GetXpertWorkflowQuery(xpert.id, agentKeyOrName, command.options?.isDraft))
		if (!agent) {
			throw new NotFoundException(
				`Xpert agent not found for '${xpert.name}' and key or name '${agentKeyOrName}', draft is ${command.options?.isDraft}`
			)
		}
		const partners = []
		getSwarmPartners(xpertGraph, agent.key, partners)
		let swarmOrGraph = null
		if (partners.length > 1) {
			// Swarm
			swarmOrGraph = await this.commandBus.execute<
				XpertAgentSwarmCommand,
				{ agent: IXpertAgent; graph: CompiledStateGraph<any, any, any> }
			>(
				new XpertAgentSwarmCommand(agentKeyOrName, xpert, {
					...options,
					rootController: rootController,
					signal: rootController.signal,
					partners
				})
			)
		} else {
			// Create graph by command
			swarmOrGraph = await this.commandBus.execute<
				XpertAgentSubgraphCommand,
				{ agent: IXpertAgent; graph: CompiledStateGraph<any, any, any> }
			>(
				new XpertAgentSubgraphCommand(agentKeyOrName, xpert, {
					...options,
					isStart: true,
					rootController: rootController,
					signal: rootController.signal,
					channel: channelName(agent.key),
					partners: []
				})
			)
		}
		const { graph } = swarmOrGraph

		return {
			graph,
			agent
		}
	}
}
