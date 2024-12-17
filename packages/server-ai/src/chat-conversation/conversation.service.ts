import { BaseStore } from '@langchain/langgraph'
import { PaginationParams, RequestContext, TenantOrganizationAwareCrudService } from '@metad/server-core'
import { InjectQueue } from '@nestjs/bull'
import { Injectable, Logger } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { InjectRepository } from '@nestjs/typeorm'
import { Queue } from 'bull'
import { DeepPartial, Repository } from 'typeorm'
import { ChatMessageService } from '../chat-message/chat-message.service'
import { CreateCopilotStoreCommand } from '../copilot-store'
import { FindAgentExecutionsQuery } from '../xpert-agent-execution/queries'
import { ChatConversation } from './conversation.entity'
import { ChatConversationPublicDTO } from './dto'

@Injectable()
export class ChatConversationService extends TenantOrganizationAwareCrudService<ChatConversation> {
	private readonly logger = new Logger(ChatConversationService.name)

	constructor(
		@InjectRepository(ChatConversation)
		repository: Repository<ChatConversation>,
		private readonly messageService: ChatMessageService,
		readonly commandBus: CommandBus,
		readonly queryBus: QueryBus,
		@InjectQueue('conversation-summary') private summaryQueue: Queue
	) {
		super(repository)
	}

	async findAllByXpert(xpertId: string, options: PaginationParams<ChatConversation>) {
		return this.findAll({
			...options,
			where: {
				xpertId
			}
		})
	}

	async findOneDetail(id: string, options: DeepPartial<PaginationParams<ChatConversation>>) {
		// Split executions relation
		const { relations } = options ?? {}
		const entity = await this.findOne(id, {
			...(options ?? {}),
			relations: relations?.filter((_) => _ !== 'executions')
		})

		let executions = null
		if (relations?.includes('executions')) {
			const result = await this.queryBus.execute(
				new FindAgentExecutionsQuery({ where: { threadId: entity.threadId } })
			)
			executions = result.items
		}

		return new ChatConversationPublicDTO({
			...entity,
			executions
		})
	}

	async triggerSummary(conversationId: string, messageId: string) {
		const message = await this.messageService.findOne(messageId)

		if (message && message.summaryJob) {
			return
		}
		return await this.summaryQueue.add({
			conversationId,
			messageId,
			userId: RequestContext.currentUserId()
		})
	}

	async deleteSummary(conversationId: string, messageId: string) {
		const conversation = await this.findOne(conversationId)
		const message = await this.messageService.findOne(messageId)
		const { tenantId, organizationId } = message
		const userId = RequestContext.currentUserId()

		const summaryJob = message.summaryJob
		try {
			if (summaryJob?.jobId) {
				const job = await this.getJob(summaryJob.jobId)
				// cancel job
				if (job) {
					await job.discard()
					await job.moveToFailed({ message: 'Job stopped by user' }, true)
				}
			}

			if (summaryJob) {
				if (summaryJob.memoryKey) {
					const keys = Array.isArray(summaryJob.memoryKey) ? summaryJob.memoryKey : [summaryJob.memoryKey]

					const store = await this.commandBus.execute<CreateCopilotStoreCommand, BaseStore>(
						new CreateCopilotStoreCommand({
							tenantId,
							organizationId,
							userId
						})
					)

					for await (const key of keys) {
						await store.delete([conversation.xpertId], key)
					}
				}

				await this.messageService.update(messageId, { summaryJob: null })
			}
		} catch (err) {
			this.logger.error(err)
		}
	}

	async getJob(id: number | string) {
		return await this.summaryQueue.getJob(id)
	}
}
