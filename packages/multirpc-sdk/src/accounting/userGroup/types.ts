import { Address } from '@ankr.com/provider';

import { Web3Address } from '../../common';

export interface IApiUserGroupParams {
  group?: Address;
  totp?: string; // TODO: remove this param from IApiUserGroupParams and use separately (https://ankrnetwork.atlassian.net/browse/MRPC-3690)
}

// and pay attention to UserGroupRole type in packages/multirpc-sdk/src/backoffice/types.ts
export enum GroupUserRole {
  dev = 'DEV',
  finance = 'FINANCE',
  owner = 'OWNER',
  admin = 'ADMIN',
}

export interface IApiUserGroup {
  address: string;
  name: string;
  user_role: GroupUserRole;
  comment: string;
  company_type: string;
  is_enterprise: boolean;
  is_freemium: boolean;
  is_suspended: boolean;
  members_limit: number;
  member_cnt: number;
  invite_cnt: number;
}

export interface UserGroup {
  address: string;
  name: string;
  role: GroupUserRole;

  index: number;
  comment?: string;
  companyType?: string;
  isEnterprise?: boolean;
  isFreemium?: boolean;
  isSuspended?: boolean;
  membersLimit?: number;
  membersCount?: number;
  invitesCount?: number;
}

export interface ICreateUserGroupParams {
  name: string; // human readable name of the group
  company_type?: string; // human readable information about group type (or company)
  comment?: string; // can be used for icon and color,  ASCII only, up to 254 symbols
  transfer_assets: boolean; // should be set to true if user is willing to transfer ALL his own assets to the group
}

export interface IUserGroupMember {
  address: Web3Address;
  email: string;
  role: GroupUserRole;
}

export interface IPendingUserGroupMember extends IUserGroupMember {
  status: 'PENDING';
  url: string;
}

export interface IApiUserGroupDetails {
  name: string;
  address: Web3Address;
  comment: string;
  company_type: string;
  member_cnt: number;
  members_limit: number;
  members: IUserGroupMember[];
  invitations?: IPendingUserGroupMember[];
}

export interface ICreateUserGroupResponse {
  group: IApiUserGroupDetails;
  asset_transfer_done: boolean;
}

export interface IUserGroupsResponse {
  groups: IApiUserGroup[];
}

export interface IGetGroupJwtRequestParams {
  group: Address;
}

export interface IGetGroupJwtResponse {
  jwt_data: string;
}

export interface IGetIsGroupCreationAvailableResult {
  groupCreationAvailable: boolean;
}

export interface IGetIsGroupCreationAvailableResponse {
  result: IGetIsGroupCreationAvailableResult;
}
