import { Tool } from '@langchain/core/tools'
import {
	ChatMessageTypeEnum,
	isEnableTool,
	IXpertToolset,
	JSONValue,
	LanguagesEnum,
	mapTranslationLanguage,
	TAgentRunnableConfigurable
} from '@metad/contracts'
import { Indicator } from '@metad/ocap-core'
import { TBuiltinToolsetParams } from '@metad/server-ai'
import { shortuuid } from '@metad/server-common'
import { t } from 'i18next'
import { AbstractChatBIToolset } from '../chatbi/chatbi-toolset'
import { ChatBIToolsEnum } from '../chatbi/types'
import { createChatAnswerTool } from './tools/answer_question'
import { createWelcomeTool } from './tools/welcome'
import { ChatBILarkToolsEnum } from './types'

export class ChatBILarkToolset extends AbstractChatBIToolset {
	static provider = 'chatbi-lark'

	constructor(
		protected toolset: IXpertToolset,
		params: TBuiltinToolsetParams
	) {
		super(ChatBILarkToolset.provider, toolset, params)
	}

	async initTools() {
		await super.initTools()

		const tools = this.toolset.tools.filter((_) => isEnableTool(_, this.toolset))
		if (tools.find((_) => _.name === ChatBILarkToolsEnum.WELCOME)) {
			this.tools.push(
				createWelcomeTool(this, {
					dsCoreService: this.dsCoreService,
					models: this.models
				})
			)
		}

		// if (tools.find((_) => _.name === ChatBIToolsEnum.SHOW_INDICATORS)) {
		// 	this.tools.push(
		// 		createShowIndicatorsTool({
		// 			dsCoreService: this.dsCoreService,
		// 			entityType: null
		// 		}) as unknown as Tool
		// 	)
		// }

		if (tools.find((_) => _.name === ChatBIToolsEnum.ANSWER_QUESTION)) {
			this.tools.push(
				createChatAnswerTool(
					{
						dsCoreService: this.dsCoreService,
						chatbi: this
					},
					this.toolsetCredentials
				) as unknown as Tool
			)
		}

		return this.tools
	}

	async onCreatedIndicator(indicator: Indicator, configurable: TAgentRunnableConfigurable) {
		const { subscriber, xpertName, agentKey, language } = configurable ?? {}
		// const lang = mapTranslationLanguage(language as LanguagesEnum)
		subscriber.next({
			data: {
				type: ChatMessageTypeEnum.MESSAGE,
				data: {
					id: shortuuid(),
					type: 'update',
					data: {
						elements: [
							{
								tag: 'markdown',
								content:
									`:Pin: ${t('analytics:Tools.ChatBI.NewCalculatedIndicator')}\n` +
									`**${t('analytics:Tools.ChatBI.Name')}:** ${indicator.name}\n` +
									`**${t('analytics:Tools.ChatBI.Code')}:** ${indicator.code}\n` +
									`**${t('analytics:Tools.ChatBI.Formula')}:**\n` +
									`\`\`\`SQL\n` +
									`${indicator.formula}\n` +
									`\`\`\`\n` +
									`${indicator.unit ? `**${t('analytics:Tools.ChatBI.Unit')}:** ${indicator.unit}\n` : ''}`
							},
							{
								tag: 'hr'
							}
						]
					} as unknown as JSONValue,
					xpertName,
					agentKey
				}
			}
		} as MessageEvent)
	}
}
