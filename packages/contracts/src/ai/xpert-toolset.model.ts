import { AiProviderRole } from './copilot.model'
import { TAvatar } from '../types'
import { IXpertTool, XpertToolType } from './xpert-tool.model'
import { IBasePerWorkspaceEntityModel } from './xpert-workspace.model'
import { ITag } from '../tag-entity.model'
import { TCopilotModel } from './copilot-model.model'
import { Subscriber } from 'rxjs'
import { I18nObject } from '../types'


export enum XpertToolsetCategoryEnum {
  BUILTIN = 'builtin',
  API = 'api',
  /**
   * @deprecated
   */
  WORKFLOW = 'workflow'
}

export type XpertToolsetType = string
export type TXpertToolset = {
  /**
   * toolset name
   */
  name: string
  type?: XpertToolsetType
  category?: 'command' | XpertToolsetCategoryEnum
  description?: string
  /**
   * avatar object
   */
  avatar?: TAvatar
  /**
   * Priority role of AI provider
   * @default `AiProviderRole.Secondary`
   */
  aiProviderRole?: AiProviderRole

  /**
   * Privacy policy of this toolset
   */
  privacyPolicy?: string
  /**
   * Custom disclaimer for the toolset
   */
  customDisclaimer?: string

  options?: TXpertToolsetOptions
  credentials?: TToolCredentials
  schema?: string
  schemaType?: 'openapi_json' | 'openapi_yaml'

  tools?: IXpertTool[]

  tags?: ITag[]
}

/**
 * Toolset for Xpert
 */
export interface IXpertToolset extends IBasePerWorkspaceEntityModel, TXpertToolset {}

export type TXpertToolsetOptions = {
  baseUrl?: string
  toolPositions?: Record<string, number>
  [key: string]: any
}

/**
 * Context env when tool call in langchain.js
 */
export type XpertToolContext = {
  tenantId: string
  organizationId?: string
  userId: string
  copilotModel: TCopilotModel
  chatModel: unknown // BaseChatModel in langchain
  tool_call_id: string
  subscriber: Subscriber<MessageEvent>
}

export enum CredentialsType {
  SECRET_INPUT = 'secret-input',
  TEXT_INPUT = 'text-input',
  SELECT = 'select',
  REMOTE_SELECT = 'remote-select',
  BOOLEAN = 'boolean'
}

export interface ToolCredentialsOption {
  value: string
  label: I18nObject | string
}

export interface ToolProviderCredentials {
  name: string
  type: CredentialsType
  required?: boolean
  default?: number | string
  options?: ToolCredentialsOption[]
  /**
   * Url for fetch remote select options
   */
  selectUrl?: string
  /**
   * Is multiple select
   */
  multi?: boolean
  /**
   * Depends on credentials
   */
  depends?: string[]
  label?: I18nObject
  help?: I18nObject
  /**
   * Url for help document
   */
  url?: string
  placeholder?: I18nObject
}

export enum ApiProviderAuthType {
  /**
   * Enum class for api provider auth type.
   */
  NONE = "none",
  API_KEY = "api_key",
  BASIC = 'basic'
}

export enum ApiProviderSchemaType {
  /**
   * Enum class for api provider schema type.
   */
  OPENAPI = "openapi",
  SWAGGER = "swagger",
  OPENAI_PLUGIN = "openai_plugin",
  OPENAI_ACTIONS = "openai_actions"
}

export enum ToolTagEnum {
	SEARCH = 'search',
	IMAGE = 'image',
	VIDEOS = 'videos',
	WEATHER = 'weather',
	FINANCE = 'finance',
	DESIGN = 'design',
	TRAVEL = 'travel',
	SOCIAL = 'social',
	NEWS = 'news',
	MEDICAL = 'medical',
	PRODUCTIVITY = 'productivity',
	EDUCATION = 'education',
	BUSINESS = 'business',
	ENTERTAINMENT = 'entertainment',
	UTILITIES = 'utilities',
	ANALYSIS = 'analysis',
	OTHER = 'other'
}

export interface IToolTag {
	name: string
	label: I18nObject
	icon: string
}

export interface IToolProvider {
  not_implemented?: boolean
  pro?: boolean
  id: string;
  author: string;
  name: string; // identifier
  description: I18nObject;
  /**
   * @deprecated use avatar
   */
  icon?: string;
  avatar: TAvatar
  label: I18nObject; // label
  type: XpertToolsetCategoryEnum;
  masked_credentials?: Record<string, any>
  original_credentials?: Record<string, any>
  is_team_authorization: boolean
  allow_delete: boolean
  tools?: XpertToolType[]
  // labels?: ToolTagEnum[]
  tags: ToolTagEnum[];
}

export type TToolCredentials = Record<string, string | number | boolean | any>