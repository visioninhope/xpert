import { DynamicStructuredTool, DynamicTool } from '@langchain/core/tools'
import { Observable } from 'rxjs'
import { CopilotChatMessage } from './types/types'

/**
 * Copilot command, which can execute multiple actions.
 */
export interface CopilotCommand<Inputs extends any[] = any[]> {
  /**
   * Full name of the command
   */
  name?: string
  /**
   * Alias (short name) of the command
   */
  alias?: string
  /**
   * Description of the command
   */
  description: string
  /**
   * Examples of the command usage
   */
  examples?: string[]
  /**
   * Get system prompt message
   *
   * @returns System prompt message
   */
  systemPrompt?: (options?: { params?: CopilotContextParam[] }) => Promise<string>
  /**
   *
   * @param args
   * @returns
   */
  implementation?: (...args: Inputs) => Promise<void | string | CopilotChatMessage>
  /**
   * @deprecated use `tools` instead
   */
  actions?: string[]
  /**
   * Tools for agent (langchain)
   */
  tools?: Array<DynamicStructuredTool | DynamicTool>
  /**
   * Prompt template for Agent executor
   */
  prompt?: any

  agent?: {
    type: CopilotAgentType
  }
}
export enum CopilotAgentType {
  Default = 'Default',
  OpenAI = 'OpenAI',
  LangChain = 'LangChain'
}

export interface CopilotContext {
  items(): Observable<CopilotContextItem[]>
  commands(): Array<CopilotCommand>

  getCommand(name: string): CopilotCommand | null
  getCommandWithContext(name: string): { command: CopilotCommand; context: CopilotContext } | null
  getContextItem(key: string): Promise<CopilotContextItem | null>
}

export interface CopilotContextItem<T = any> {
  key: string
  caption: string
  uKey: string
  serizalize(): Promise<string>
  value: T
}

export type CopilotContextParam = {
  content: string
  context: CopilotContext
  item: CopilotContextItem
}

export const SystemCommandClear = 'clear'
export const SystemCommandFree = 'free'
