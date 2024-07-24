import { DynamicStructuredTool } from '@langchain/core/tools'
import { ChatOpenAI } from '@langchain/openai'
import { Team } from '@metad/copilot'
import { TABLE_CREATOR_NAME } from '../table/types'

export async function createSupervisorAgent({
  llm,
  tools,
}: {
  llm: ChatOpenAI
  tools: DynamicStructuredTool[]
}) {
  const agent = await Team.createSupervisorAgent(
    llm,
    [
      {
        name: TABLE_CREATOR_NAME,
        description: 'Create a table, only one at a time'
      }
    ],
    tools,
    `You are a Database Administrator for data analysis, now you need create a plan for the final goal.
{role}
{language}
{context}
调用工具时请在参数中说明详细功能和用途。
`,
    `Use only one tool at a time`
  )

  return agent
}
