import { AiProvider, ICopilot, IKnowledgebase, KnowledgebaseParserConfig } from '@metad/contracts'
import { Optional } from '@nestjs/common'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsJSON, IsNumber, IsOptional, IsString } from 'class-validator'
import { Column, Entity, Index, JoinColumn, ManyToOne, RelationId } from 'typeorm'
import { Copilot, TenantOrganizationBaseEntity } from '../core/entities/internal'

@Entity('knowledgebase')
@Index(['tenantId', 'organizationId', 'name'], { unique: true })
export class Knowledgebase extends TenantOrganizationBaseEntity implements IKnowledgebase {
	@ApiPropertyOptional({ type: () => String })
	@IsString()
	@Column()
	name: string

	@ApiPropertyOptional({ type: () => String })
	@IsString()
	@Optional()
	@Column({ nullable: true, length: 20 })
	language?: 'Chinese' | 'English'

	@ApiPropertyOptional({ type: () => String })
	@IsString()
	@Optional()
	@Column({ nullable: true })
	avatar?: string

	@ApiPropertyOptional({ type: () => String })
	@IsString()
	@Optional()
	@Column({ nullable: true })
	description?: string

	@ApiPropertyOptional({ type: () => String })
	@IsString()
	@IsOptional()
	@Column({ nullable: true, length: 20 })
	aiProvider?: AiProvider

	@ApiPropertyOptional({ type: () => String })
	@IsString()
	@Optional()
	@Column({ nullable: true })
	embeddingModelId?: string

	@ApiPropertyOptional({ type: () => Number })
	@IsNumber()
	@Optional()
	@Column({ nullable: true })
	documentNum?: number

	@ApiPropertyOptional({ type: () => Number })
	@IsNumber()
	@Optional()
	@Column({ nullable: true })
	tokenNum?: number

	@ApiPropertyOptional({ type: () => Number })
	@IsNumber()
	@Optional()
	@Column({ nullable: true })
	chunkNum?: number

	@ApiPropertyOptional({ type: () => Number })
	@IsNumber()
	@Optional()
	@Column({ nullable: true })
	similarityThreshold: number

	@ApiPropertyOptional({ type: () => Number })
	@IsNumber()
	@Optional()
	@Column({ nullable: true })
	vectorSimilarityWeight: number

	@ApiPropertyOptional({ type: () => String })
	@IsString()
	@Optional()
	@Column({ nullable: true })
	parserId: string

	@ApiPropertyOptional({ type: () => Object })
	@IsJSON()
	@IsOptional()
	@Column({ type: 'json', nullable: true })
	parserConfig: KnowledgebaseParserConfig

	@ApiPropertyOptional({ type: () => String })
	@IsString()
	@Optional()
	@Column({ nullable: true })
	status: string

	@ApiProperty({ type: () => Copilot, readOnly: true })
	@ManyToOne(() => Copilot, {
		nullable: true,
	})
	@JoinColumn()
	@IsOptional()
	copilot?: ICopilot

	@ApiProperty({ type: () => String, readOnly: true })
	@RelationId((it: Knowledgebase) => it.copilot)
	@IsString()
	@IsOptional()
	@Column({ nullable: true })
	copilotId?: string
}
