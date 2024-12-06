import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { RouterModule } from 'nest-router'
import { CopilotModule } from '../copilot'
import { CopilotOrganizationModule } from '../copilot-organization/index'
import { CopilotUserModule } from '../copilot-user/index'
import { TenantModule } from '@metad/server-core'
import { AIController } from './ai.controller'
import { AiService } from './ai.service'
import { AIV1Controller } from './ai-v1.controller'
import { ThreadsController } from './thread.controller'
import { XpertTokenStrategy } from './basic.strategy'

@Module({
	imports: [
		RouterModule.forRoutes([
			{
				path: '/ai',
				module: AIModule
			}
		]),
		TenantModule,
		CqrsModule,
		CopilotModule,
		CopilotUserModule,
		CopilotOrganizationModule
	],
	controllers: [AIController, AIV1Controller, ThreadsController],
	providers: [AiService, XpertTokenStrategy]
})
export class AIModule {}
