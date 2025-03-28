import { IXpertTask, XpertTaskStatus } from '@metad/contracts'
import { CrudController, RequestContext, TransformInterceptor } from '@metad/server-core'
import { BadRequestException, Body, Controller, Delete, Get, Logger, Param, Put, Query, UseInterceptors } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { In } from 'typeorm'
import { XpertTask } from './xpert-task.entity'
import { XpertTaskService } from './xpert-task.service'
import { getErrorMessage } from '@metad/server-common'

@ApiTags('XpertTask')
@ApiBearerAuth()
@UseInterceptors(TransformInterceptor)
@Controller()
export class XpertTaskController extends CrudController<XpertTask> {
	readonly #logger = new Logger(XpertTaskController.name)

	constructor(
		private readonly service: XpertTaskService,
		private readonly commandBus: CommandBus
	) {
		super(service)
	}

	@Get('by-ids')
	async getAllByIds(@Query('ids') ids: string) {
		const _ids = ids.split(',')
		return this.service.findAll({
			where: {
				createdById: RequestContext.currentUserId(),
				id: In(_ids)
			},
			relations: ['executions', 'xpert']
		})
	}

	@Put(':id')
	async update(@Param('id') id: string, @Body() entity: Partial<IXpertTask>) {
		try {
			return await this.service.updateTask(id, entity)
		} catch(err) {
			throw new BadRequestException(getErrorMessage(err))
		}
	}

	@Put(':id/schedule')
	async schedule(@Param('id') id: string, @Body() entity: Partial<IXpertTask>) {
		try {
			if (entity) {
				return await this.service.updateTask(id, {...entity, status:  XpertTaskStatus.RUNNING})
			}
			return await this.service.schedule(id)
		} catch(err) {
			throw new BadRequestException(getErrorMessage(err))
		}
	}

	@Put(':id/pause')
	async pause(@Param('id') id: string) {
		return this.service.pause(id)
	}

	@Delete(':id/soft')
	async softDelete(@Param('id') id: string) {
		await this.service.pause(id)
		return this.service.softDelete(id)
	}
}
