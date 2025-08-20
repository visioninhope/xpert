import { XpertAgentExecutionStatusEnum } from '@metad/contracts'
import { CommandBus, CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs'
import { isNil, omitBy } from 'lodash'
import { map } from 'rxjs/operators'
import { ChatConversationUpsertCommand, GetChatConversationQuery } from '../../../chat-conversation'
import { FindXpertQuery, XpertChatCommand } from '../../../xpert'
import { XpertAgentExecutionUpsertCommand } from '../../../xpert-agent-execution'
import { RunCreateStreamCommand } from '../run-create-stream.command'

@CommandHandler(RunCreateStreamCommand)
export class RunCreateStreamHandler implements ICommandHandler<RunCreateStreamCommand> {
	constructor(
		private readonly commandBus: CommandBus,
		private readonly queryBus: QueryBus
	) {}

	public async execute(command: RunCreateStreamCommand): Promise<any> {
		const threadId = command.threadId
		const input = command.input

		// Find thread (conversation) and assistant (xpert)
		const conversation = await this.queryBus.execute(new GetChatConversationQuery({ threadId }))
		const xpert = await this.queryBus.execute(new FindXpertQuery({ id: input.assistant_id }, {}))

		// Update xpert id for chat conversation
		conversation.xpertId = xpert.id
		await this.commandBus.execute(new ChatConversationUpsertCommand(conversation))

		const execution = await this.commandBus.execute(
			new XpertAgentExecutionUpsertCommand({
				threadId: conversation.threadId,
				status: XpertAgentExecutionStatusEnum.RUNNING
			})
		)
		const stream = await this.commandBus.execute(
			new XpertChatCommand(
				{
					input: input.input as any,
					xpertId: xpert.id,
					conversationId: conversation.id
				},
				{
					from: 'api',
					execution
				}
			)
		)
		return {
			execution,
			stream: stream.pipe(
				map((message: any) => {
					if (typeof message.data.data === 'object') {
						return {
							...message,
							data: {
								...message.data,
								data: omitBy(message.data.data, isNil) // Remove null or undefined values
							}
						}
					}

					return message
				})
			)
		}
	}
}
