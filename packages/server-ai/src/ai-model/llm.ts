import { ILLMUsage, PriceType } from '@metad/contracts'
import { AIModel } from './ai-model'

export class LLMUsage implements ILLMUsage {
	/**
	 * Model class for llm usage.
	 */
	promptTokens: number
	promptUnitPrice: number
	promptPriceUnit: number
	promptPrice: number
	completionTokens: number
	completionUnitPrice: number
	completionPriceUnit: number
	completionPrice: number
	totalTokens: number
	totalPrice: number
	currency: string
	latency: number

	constructor(
		promptTokens: number,
		promptUnitPrice: number,
		promptPriceUnit: number,
		promptPrice: number,
		completionTokens: number,
		completionUnitPrice: number,
		completionPriceUnit: number,
		completionPrice: number,
		totalTokens: number,
		totalPrice: number,
		currency: string,
		latency: number
	) {
		this.promptTokens = promptTokens
		this.promptUnitPrice = promptUnitPrice
		this.promptPriceUnit = promptPriceUnit
		this.promptPrice = promptPrice
		this.completionTokens = completionTokens
		this.completionUnitPrice = completionUnitPrice
		this.completionPriceUnit = completionPriceUnit
		this.completionPrice = completionPrice
		this.totalTokens = totalTokens
		this.totalPrice = totalPrice
		this.currency = currency
		this.latency = latency
	}

	static emptyUsage(): LLMUsage {
		return new LLMUsage(0, 0.0, 0.0, 0.0, 0, 0.0, 0.0, 0.0, 0, 0.0, 'USD', 0.0)
	}

	plus(other: LLMUsage): LLMUsage {
		/**
		 * Add two LLMUsage instances together.
		 *
		 * @param other: Another LLMUsage instance to add
		 * @return: A new LLMUsage instance with summed values
		 */
		if (this.totalTokens === 0) {
			return other
		} else {
			return new LLMUsage(
				this.promptTokens + other.promptTokens,
				other.promptUnitPrice,
				other.promptPriceUnit,
				this.promptPrice + other.promptPrice,
				this.completionTokens + other.completionTokens,
				other.completionUnitPrice,
				other.completionPriceUnit,
				this.completionPrice + other.completionPrice,
				this.totalTokens + other.totalTokens,
				this.totalPrice + other.totalPrice,
				other.currency,
				this.latency + other.latency
			)
		}
	}

	add(other: LLMUsage): LLMUsage {
		/**
		 * Overload the + operator to add two LLMUsage instances.
		 *
		 * @param other: Another LLMUsage instance to add
		 * @return: A new LLMUsage instance with summed values
		 */
		return this.plus(other)
	}
}

export abstract class LargeLanguageModel extends AIModel {
	protected startedAt: DOMHighResTimeStamp

	protected calcResponseUsage(
		model: string,
		credentials: Record<string, any>,
		promptTokens: number,
		completionTokens: number
	): ILLMUsage {
		// 获取提示价格信息
		const promptPriceInfo = this.getPrice(model, credentials, PriceType.INPUT, promptTokens)

		// 获取完成价格信息
		const completionPriceInfo = this.getPrice(model, credentials, PriceType.OUTPUT, completionTokens)

		// 转换使用情况
		const usage: ILLMUsage = {
			promptTokens: promptTokens,
			promptUnitPrice: promptPriceInfo.unitPrice,
			promptPriceUnit: promptPriceInfo.unit,
			promptPrice: promptPriceInfo.totalAmount,
			completionTokens: completionTokens,
			completionUnitPrice: completionPriceInfo.unitPrice,
			completionPriceUnit: completionPriceInfo.unit,
			completionPrice: completionPriceInfo.totalAmount,
			totalTokens: promptTokens + completionTokens,
			totalPrice: promptPriceInfo.totalAmount + completionPriceInfo.totalAmount,
			currency: promptPriceInfo.currency,
			latency: performance.now() - this.startedAt
		}

		return usage
	}
}
