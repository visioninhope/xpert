import { IQueryHandler, QueryBus, QueryHandler } from '@nestjs/cqrs'
import { getRepository } from 'typeorm'
import { ChatConversation } from '../../../core/entities/internal'
import { StatisticsDailyEndUsersQuery } from '../statistics-daily-end-suers.query'
import { RequestContext } from '@metad/server-core'

@QueryHandler(StatisticsDailyEndUsersQuery)
export class StatisticsDailyEndUsersHandler implements IQueryHandler<StatisticsDailyEndUsersQuery> {
	constructor(private readonly queryBus: QueryBus) {}

	public async execute(command: StatisticsDailyEndUsersQuery) {
		const { xpertId, start, end } = command
		const tenantId = RequestContext.currentTenantId()
		const organizationId = RequestContext.getOrganizationId()

		const repository = getRepository(ChatConversation)

		const query = repository
			.createQueryBuilder('conversation')
			.select('DATE("createdAt") as date')
			.addSelect('COUNT(DISTINCT COALESCE("fromEndUserId", "createdById"::text)) as count')
			.where('conversation.tenantId = :tenantId', {tenantId})
			.andWhere('conversation.organizationId = :organizationId', {organizationId})
			.andWhere('conversation.from != :from', { from: 'debugger' })

		if (xpertId) {
			query.andWhere('conversation.xpertId = :xpertId', { xpertId })
		}
			
		if (start) {
			query.andWhere('conversation.createdAt >= :start', { start })
		}
		if (end) {
			query.andWhere('conversation.createdAt <= :end', { end })
		}
		query.addGroupBy('date').orderBy('date')

		return await query.getRawMany()
	}
}
