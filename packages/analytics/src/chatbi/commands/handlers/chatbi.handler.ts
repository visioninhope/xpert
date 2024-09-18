import { BaseChatModel } from '@langchain/core/language_models/chat_models'
import { AiProviderRole } from '@metad/copilot'
import { Agent, DataSourceFactory } from '@metad/ocap-core'
import {
	CopilotCheckpointSaver,
	CopilotKnowledgeService,
	CopilotService,
	CopilotTokenRecordCommand,
	createLLM
} from '@metad/server-ai'
import { Inject, Logger } from '@nestjs/common'
import { CommandBus, CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { from, Observable } from 'rxjs'
import { IsNull } from 'typeorm'
import { ChatBIModelService } from '../../../chatbi-model'
import { SemanticModelMemberService } from '../../../model-member'
import { NgmDSCoreService, OCAP_AGENT_TOKEN, OCAP_DATASOURCE_TOKEN } from '../../../model/ocap'
import { ChatBIService } from '../../chatbi.service'
import { ChatBIConversation } from '../../conversation'
import { ChatBILarkContext } from '../../types'
import { ChatBICommand } from '../chatbi.command'

@CommandHandler(ChatBICommand)
export class ChatBIHandler implements ICommandHandler<ChatBICommand> {
	private readonly logger = new Logger(ChatBIHandler.name)

	readonly commandName = 'chatbi'

	readonly userConversations = new Map<string, ChatBIConversation>()

	constructor(
		private readonly copilotService: CopilotService,
		private readonly modelService: ChatBIModelService,
		private readonly semanticModelMemberService: SemanticModelMemberService,
		private readonly copilotCheckpointSaver: CopilotCheckpointSaver,
		private readonly copilotKnowledgeService: CopilotKnowledgeService,
		private readonly chatBIService: ChatBIService,
		@Inject(OCAP_AGENT_TOKEN)
		private agent: Agent,
		@Inject(OCAP_DATASOURCE_TOKEN)
		private dataSourceFactory: { type: string; factory: DataSourceFactory },
		private readonly commandBus: CommandBus
	) {}

	public async execute(command: ChatBICommand): Promise<Observable<any>> {
		const { input } = command
		const { larkService } = input

		const conversation = await this.getUserConversation(input)
		if (!conversation) {
			return from(
				larkService.errorMessage(
					input,
					new Error(`Failed to create chat conversation for user: ${input.userId}`)
				)
			)
		}

		return new Observable((subscriber) => {
			conversation.ask(input.text).then()
			return () => {
				// when cancel
				conversation.destroy()
			}
		})
	}

	async getUserConversation(input: ChatBILarkContext): Promise<ChatBIConversation> {
		const { chatId, userId, larkService } = input
		const conversationId = userId + '/' + chatId
		if (!this.userConversations.get(conversationId)) {
			this.logger.debug(`未找到会话，新建会话为用户：${userId}`)
			try {
				this.userConversations.set(conversationId, await this.createChatConversation(input))
			} catch (err) {
				console.error(err)
				larkService.errorMessage(input, err)
			}
		}

		return this.userConversations.get(conversationId)
	}

	async createChatConversation(input: ChatBILarkContext) {
		const { tenant, organizationId, user } = input
		const tenantId = tenant.id
		const { items } = await this.copilotService.findAllWithoutOrganization({
			where: {
				tenantId,
				organizationId: organizationId ? organizationId : IsNull()
			}
		})
		const copilot = items.find((item) => item.role === AiProviderRole.Primary)
		if (!copilot) {
			throw new Error(
				`No copilot configuration found for tenant: '${tenantId}' and organization: '${organizationId}'`
			)
		}

		const chatModel = createLLM<BaseChatModel>(copilot, {}, (input) => {
			this.commandBus.execute(
				new CopilotTokenRecordCommand({
					...input,
					tenantId: tenantId,
					organizationId: organizationId,
					userId: user?.id,
					copilot: copilot
				})
			)
		})

		return new ChatBIConversation(
			input,
			chatModel,
			this.modelService,
			this.semanticModelMemberService,
			this.copilotCheckpointSaver,
			// New Ocap context for every chatbi conversation
			new NgmDSCoreService(this.agent, this.dataSourceFactory),
			this.copilotKnowledgeService,
			this.chatBIService,
			copilot.organizationId
		)
	}
}
