import { IIntegration, TRagWebOptions } from '@metad/contracts'
import { ICommand } from '@nestjs/cqrs'

export class RagWebLoadCommand implements ICommand {
	static readonly type = '[Rag Web] Load'

	constructor(
		public readonly type: string,
		public readonly input: { webOptions: TRagWebOptions; integration: IIntegration }) {}
}
