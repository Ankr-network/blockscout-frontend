import { Address } from '@ankr.com/provider';

import { IApiUserGroupParams } from '../userGroup';

export type UserEndpointTokenMode = 'ip' | 'referer' | 'address' | 'all';

export interface IUpdateWhitelistModeParams extends IApiUserGroupParams {
  token: string; // endpointToken
  type: UserEndpointTokenMode;
}

export interface IWhitelistBlockchainsParams extends IApiUserGroupParams {
  token: string; // endpointToken
}

export interface IGetWhitelistParams extends IUpdateWhitelistModeParams {
  group?: Address;
}

export interface IUpdateWhitelistModeRequestParams {
  whitelist: boolean;
  prohibit_by_default: boolean;
}

export interface IGetWhitelistParamsResponse
  extends IUpdateWhitelistModeRequestParams {
  lists: WhitelistItem[];
}

export interface WhitelistItem extends ListItem {
  blockchain: string;
}

export interface ListItem {
  type: UserEndpointTokenMode;
  list: string[];
}

export interface IUpdateWhitelistParamsResponse
  extends IUpdateWhitelistModeRequestParams {
  lists: ListItem[];
}

export interface IUpdateWhitelistModeResponse
  extends IUpdateWhitelistModeRequestParams {}

export interface IUpdateWhitelistParams extends IUpdateWhitelistModeParams {
  blockchain: string;
}
