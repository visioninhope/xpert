import { ITag, IUser, IXpert, IXpertAgent, TAvatar, XpertTypeEnum } from '@metad/contracts'
import { UserPublicDTO } from '@metad/server-core'
import { Exclude, Expose, Transform, TransformFnParams } from 'class-transformer'
import { XpertAgentIdentiDto } from '../../xpert-agent/dto'

/**
 * IdentiDto: The minimum attributes that can be exposed to represent this object
 */
@Exclude()
export class XpertIdentiDto implements Partial<IXpert> {
	@Expose()
	id: string

	@Expose()
	slug: string

	@Expose()
	name: string

	@Expose()
	type: XpertTypeEnum

	@Expose()
	description: string

	@Expose()
	avatar?: TAvatar

	@Expose()
	title?: string

	@Expose()
	titleCN?: string

	@Expose()
	version?: string

	@Expose()
	publishAt?: Date

	@Expose()
	tags?: ITag[]

	@Expose()
	@Transform((params: TransformFnParams) => (params.value ? new XpertAgentIdentiDto(params.value) : null))
	agent?: IXpertAgent

	@Expose()
	@Transform((params: TransformFnParams) => params.value?.map((_) => new XpertAgentIdentiDto(_)))
	agents?: IXpertAgent[]

	@Expose()
	@Transform(({ value }: TransformFnParams) => value && new UserPublicDTO(value))
	createdBy?: IUser

	@Expose()
	createdAt?: Date
	@Expose()
	updatedAt?: Date

	constructor(partial: Partial<XpertIdentiDto | IXpert>) {
		Object.assign(this, partial)
	}
}
