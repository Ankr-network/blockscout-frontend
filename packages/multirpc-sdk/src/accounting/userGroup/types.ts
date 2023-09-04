import { Address } from '@ankr.com/provider';

export interface IApiUserGroupParams {
  group?: Address;
  totp?: string;
}

export enum GroupUserRole {
  dev = 'GROUP_ROLE_DEV',
  finance = 'GROUP_ROLE_FINANCE',
  owner = 'GROUP_ROLE_OWNER',
}

export interface UserGroup {
  groupAddress: string;
  groupName: string;
  userRole: GroupUserRole;
}

export interface IUserGroupsResponse {
  groups: UserGroup[];
}

export interface IGetGroupJwtRequestParams {
  group: Address;
}

export interface IGetGroupJwtResponse {
  jwt_data: string;
}
