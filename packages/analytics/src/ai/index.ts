import { BUILTIN_TOOLSET_REPOSITORY } from '@metad/server-ai'
import { ChatBILarkToolset, ChatBIToolset, ChatBIWeComToolset, ChatDBToolset, IndicatorToolset } from './toolset/builtin'

BUILTIN_TOOLSET_REPOSITORY.splice(0, 0, {
	baseUrl: `packages/analytics/src/ai/toolset/builtin`,
	providers: [ ChatBIToolset, ChatDBToolset, ChatBILarkToolset, IndicatorToolset, ChatBIWeComToolset ]
})

export { ChatBIToolset, ChatDBToolset, ChatBILarkToolset, IndicatorToolset, ChatBIWeComToolset }
