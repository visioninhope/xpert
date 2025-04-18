import { IBasePerTenantAndOrganizationEntityModel } from '../base-entity.model'
import { ITag } from '../tag-entity.model'
import { IUser } from '../user.model'
import { Visibility } from '../visibility.model'
import { IBusinessArea } from './business-area'
import { IDataSource } from './data-source'
import { IIndicator } from './indicator'
import { IModelQuery } from './model-query'
import * as MDX from './schema'
import { IStory } from './story'

/**
 * Data agent types
 */
export enum AgentType {
  Local = 'local',
  Browser = 'browser',
  Server = 'server',
  Wasm = 'wasm'
}

/**
 * Preferences of semantic model
 */
export interface ISemanticModelPreferences {
  // Cache
  enableCache?: boolean
  expires?: number
  // preferred Language
  language?: string
  // Expose Xmla service for Semantic Model
  exposeXmla?: boolean
}

export type TSemanticModelOptions<T> = {
  schema?: T
  settings?: any
}

export type TSemanticModel = {
  key?: string
  name?: string
  description?: string
  type?: string
  agentType?: AgentType

  dataSourceId?: string
  businessAreaId?: string

  catalog?: string
  cube?: string
  // 存放语义元数据
  options?: TSemanticModelOptions<any>
}

export type TSemanticModelDraft = TSemanticModel & {
  savedAt?: Date
}

export interface ISemanticModel extends IBasePerTenantAndOrganizationEntityModel, TSemanticModel {
  /**
   * 当前版本上的草稿
   */
  draft?: TSemanticModelDraft

  tags?: ITag[]
  
  dataSource?: IDataSource
  
  businessArea?: IBusinessArea
  
  // 存放模型配置
  preferences?: ISemanticModelPreferences

  visibility?: Visibility

  status?: SemanticModelStatusEnum
  /**
   * Model owner, can be transfered
   */
  owner?: IUser
  ownerId?: string

  members?: IUser[]
  // Stories
  stories?: Array<IStory>
  // Indicators
  indicators?: Array<IIndicator>
  // Query
  queries?: Array<IModelQuery>
  // Roles
  roles?: Array<IModelRole>
}

/**
 * Types of semantic model
 */
export enum ModelTypeEnum {
  XMLA = 'XMLA',
  SQL = 'SQL'
}

/**
 * Role in semantic model
 */
export interface IModelRole extends IBasePerTenantAndOrganizationEntityModel {
  modelId: string
  model?: ISemanticModel
  key: string
  name: string
  type?: null | '' | RoleTypeEnum
  options: MDX.Role
  index?: number
  users?: IUser[]
}

/**
 * Role types
 */
export enum RoleTypeEnum {
  single = 'single',
  union = 'union'
}

/**
 * Status of semantic model
 */
export enum SemanticModelStatusEnum {
  /**
   * Using
   */
  Progressing = 'progressing',

  /**
   * Archived
   */
  Archived = 'archived'
}
