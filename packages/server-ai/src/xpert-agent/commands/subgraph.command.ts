import { DynamicStructuredTool } from '@langchain/core/tools'
import { IXpert, IXpertAgentExecution, TChatOptions, TXpertParameter } from '@metad/contracts'
import { ICommand } from '@nestjs/cqrs'
import { Subscriber } from 'rxjs'

/**
 * Create ReAct graph for agent
 */
export class XpertAgentSubgraphCommand implements ICommand {
	static readonly type = '[Xpert Agent] Subgraph'

	constructor(
		public readonly agentKeyOrName: string,
		public readonly xpert: Partial<IXpert>,
		public readonly options: TChatOptions & {
			isStart: boolean
			/**
			 * Agent key who calls me
			 */
			leaderKey?: string
			// The id of root agent execution
			rootExecutionId?: string
			// Langgraph thread id
			thread_id?: string
			execution?: IXpertAgentExecution
			// Use xpert's draft
			isDraft?: boolean
			// The subscriber response to client
			subscriber?: Subscriber<MessageEvent>
			/**
			 * Control the entire graph
			 */
			rootController: AbortController
			signal: AbortSignal
			disableCheckpointer?: boolean
			/**
			 * Temporary parameters (state variables)
			 */
			variables?: TXpertParameter[]
			channel: string
			partners?: string[]
			handoffTools?: DynamicStructuredTool<any>[]
		}
	) {}
}
