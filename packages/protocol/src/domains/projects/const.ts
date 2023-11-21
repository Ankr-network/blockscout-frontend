import { UserEndpointTokenMode } from 'multirpc-sdk';

export const projectsIntlRoot = 'projects';

export const newProjectIntlRoot = `${projectsIntlRoot}.new-project`;

export const MAX_AMOUNT_OF_IPS = 10;
export const MAX_AMOUNT_OF_DOMAINS = 10;
export const MAX_AMOUNT_OF_SMART_CONTRACT_ADDRESSES = 3;

export enum ProjectStatusLabelType {
  Suspended = 'suspended',
  Active = 'active',
  Frozen = 'frozen',
  Draft = 'draft',
}

export const PROJECTS_DOCS_LINK =
  'https://www.ankr.com/docs/rpc-service/getting-started/projects/';

export const whitelistTypeLabelMap: Record<UserEndpointTokenMode, string> = {
  [UserEndpointTokenMode.ADDRESS]: 'projects.whitelist-types.smart-contract',
  [UserEndpointTokenMode.ALL]: 'projects.whitelist-types.all',
  [UserEndpointTokenMode.IP]: 'projects.whitelist-types.ip',
  [UserEndpointTokenMode.REFERER]: 'projects.whitelist-types.domain',
};

export const whitelistItemsLimitsMap: Record<UserEndpointTokenMode, number> = {
  [UserEndpointTokenMode.ADDRESS]: MAX_AMOUNT_OF_SMART_CONTRACT_ADDRESSES,
  [UserEndpointTokenMode.IP]: MAX_AMOUNT_OF_IPS,
  [UserEndpointTokenMode.REFERER]: MAX_AMOUNT_OF_DOMAINS,
  [UserEndpointTokenMode.ALL]:
    MAX_AMOUNT_OF_SMART_CONTRACT_ADDRESSES +
    MAX_AMOUNT_OF_IPS +
    MAX_AMOUNT_OF_DOMAINS,
};

export const MAX_PROJECT_DESCRIPTION_LENGTH = 150;
export const MAX_PROJECT_NAME_LENGTH = 30;
