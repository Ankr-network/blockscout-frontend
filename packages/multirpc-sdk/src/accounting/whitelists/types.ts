import { Address } from '@ankr.com/provider';

import { IApiUserGroupParams } from '../userGroup';

export enum UserEndpointTokenMode {
  ADDRESS = 'address',
  ALL = 'all',
  IP = 'ip',
  REFERER = 'referer',
}

export enum ReplaceWhitelistItemsMode {
  Merge = 'merge',
  Overwrite = 'overwrite',
}

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

export interface ReplaceWhitelistParams extends IApiUserGroupParams {
  // endpoint token
  token: string;
  mode?: ReplaceWhitelistItemsMode;
}

export type ReplaceWhitelistBodyKey =
  UserEndpointTokenMode.ADDRESS |
  UserEndpointTokenMode.IP |
  UserEndpointTokenMode.REFERER;

export interface ReplaceWhitelistBody
  extends Record<ReplaceWhitelistBodyKey, WhitelistToReplace> {}

type BlockchainPath = string;
export interface WhitelistToReplace extends Record<BlockchainPath, string[]> {}

export interface ReplaceWhitelistResponse
  extends ReplaceWhitelistBody, IUpdateWhitelistModeRequestParams {}
