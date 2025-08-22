import {
	IBasePerTenantAndOrganizationEntityModel
} from './base-entity.model';
import { IOrganizationProjectsUpdateInput } from './organization-projects.model';
import { IOrganizationUpdateInput } from './organization.model';
import { ITag } from './tag-entity.model';
import { I18nObject, TAvatar, TParameterSchema } from './types';

// export interface IIntegrationSetting
// 	extends IBasePerTenantAndOrganizationEntityModel {
// 	settingsName: string;
// 	settingsValue: string;
// 	integration?: IIntegrationTenant;
// 	integrationId?: string;
// }

// export interface IIntegrationEntitySetting
// 	extends IBasePerTenantAndOrganizationEntityModel {
// 	entity: string;
// 	sync: boolean;
// 	integration?: IIntegrationTenant;
// 	readonly integrationId?: string;
// 	tiedEntities?: IIntegrationEntitySettingTied[];
// }

// export interface IIntegrationEntitySettingTied
// 	extends IBasePerTenantAndOrganizationEntityModel {
// 	entity: string;
// 	sync: boolean;
// 	integrationEntitySetting?: IIntegrationEntitySetting;
// 	readonly integrationEntitySettingId?: string;
// }

// export interface IIntegrationViewModel {
// 	name: string;
// 	imgSrc: string;
// 	navigation_url: string;
// 	isComingSoon?: boolean;
// }

// export interface IIntegrationTenant extends IBasePerTenantAndOrganizationEntityModel {
// 	name: string;
// 	entitySettings?: IIntegrationEntitySetting[];
// 	settings?: IIntegrationSetting[];
// }

export interface IIntegration<T = any> extends IBasePerTenantAndOrganizationEntityModel {
	name: string
	description?: string
	/**
     * avatar object
     */
	avatar?: TAvatar
	slug: string;
	provider: IntegrationEnum
	/**
	 * Integration type: Agent ...
	 */
	type?: string

	options?: T

	tags?: ITag[]
}

export interface IIntegrationFilter {
	integrationTypeId: string;
	searchQuery: string;
	filter: string;
}

export interface IIntegrationMapSyncProject 
	extends IBasePerTenantAndOrganizationEntityModel {
	organizationProjectInput: IOrganizationProjectsUpdateInput;
	integrationId: string;
	sourceId: number;
}

export interface IIntegrationMapSyncOrganization 
	extends IBasePerTenantAndOrganizationEntityModel {
	organizationInput: IOrganizationUpdateInput;
	integrationId: string;
	sourceId: number;
}

// export interface IIntegrationTenantCreateDto
// 	extends IBasePerTenantAndOrganizationEntityModel {
// 	name: string;
// 	entitySettings?: IIntegrationEntitySetting[];
// 	settings?: IIntegrationSetting[];
// }

export enum IntegrationEnum {
	UPWORK = 'Upwork',
	HUBSTAFF = 'Hubstaff',
	LARK = 'Lark',
	DINGTALK = 'DingTalk',
	WECOM = 'WeCom',
	FIRECRAWL = 'firecrawl',
	KNOWLEDGEBASE = 'knowledgebase',
	GITHUB = 'github'
}

// export enum IntegrationEntity {
// 	PROJECT = 'Project',
// 	ORGANIZATION = 'Organization',
// 	NOTE = 'Note',
// 	CLIENT = 'Client',
// 	TASK = 'Task',
// 	ACTIVITY = 'Activity',
// 	USER = 'User',
// 	EMPLOYEE = 'Employee',
// 	TIME_LOG = 'TimeLog',
// 	TIME_SLOT = 'TimeSlot',
// 	SCREENSHOT = 'Screenshot',
// 	INCOME = 'Income',
// 	EXPENSE = 'Expense',
// 	PROPOSAL = 'Proposal'
// }

export enum IntegrationTypeGroupEnum {
	FEATURED = 'Featured',
	CATEGORIES = 'Categories'
}

export enum IntegrationTypeNameEnum {
	ALL_INTEGRATIONS = 'All Integrations',
	FOR_SALES_TEAMS = 'For Sales Teams',
	FOR_ACCOUNTANTS = 'For Accountants',
	FOR_SUPPORT_TEAMS = 'For Support Teams',
	CRM = 'CRM',
	SCHEDULING = 'Scheduling',
	TOOLS = 'Tools'
}

export enum IntegrationFilterEnum {
	ALL = 'All',
	FREE = 'Free',
	PAID = 'Paid'
}

export const DEFAULT_INTEGRATION_PAID_FILTERS = [
	{
		label: IntegrationFilterEnum.ALL,
		value: 'all'
	},
	{
		label: IntegrationFilterEnum.FREE,
		value: 'false'
	},
	{
		label: IntegrationFilterEnum.PAID,
		value: 'true'
	}
];

export const DEFAULT_INTEGRATIONS = [
	{
		name: IntegrationEnum.HUBSTAFF,
		imgSrc: 'assets/images/integrations/hubstaff.svg',
		integrationTypesMap: <string[]>[
			IntegrationTypeNameEnum.ALL_INTEGRATIONS
		],
		order: 1
	},
	{
		name: IntegrationEnum.UPWORK,
		imgSrc: 'assets/images/integrations/upwork.svg',
		integrationTypesMap: <string[]>[
			IntegrationTypeNameEnum.ALL_INTEGRATIONS
		],
		order: 2
	},
	{
		name: 'Import/Export',
		imgSrc: 'assets/images/integrations/import-export.svg',
		isComingSoon: true,
		integrationTypesMap: <string[]>[
			IntegrationTypeNameEnum.ALL_INTEGRATIONS,
			IntegrationTypeNameEnum.CRM
		],
		order: 3
	}
];

/**
* Hubstaff Integration
*/
// export interface IEntitySettingToSync {
// 	previousValue: IIntegrationEntitySetting[];
// 	currentValue: IIntegrationEntitySetting[];
// }

export interface IDateRangeActivityFilter {
	start: Date;
	end: Date;
}

export type TIntegrationProvider = {
	name: string
	label: I18nObject
	avatar: string
	webhook?: boolean
	schema?: TParameterSchema
	
	webhookUrl?: (integration: IIntegration, baseUrl: string) => string
	pro?: boolean
}