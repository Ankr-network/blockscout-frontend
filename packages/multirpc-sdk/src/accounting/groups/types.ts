import { Address } from '@ankr.com/provider';

import { GroupUserRole, IApiUserGroupParams } from "../userGroup";
import { Web3Address } from '../../common';

export interface IUpdateGroupMemberRoleParams extends IApiUserGroupParams {
  userAddress: string; // body
  role: GroupUserRole; // body
}

export interface IGroupMember {
  address: string;
  role: GroupUserRole;
  email: string;
}

export interface IUpdateGroupMemberRoleResponse {
  name: string;
  address: string;
  comment: string;
  company_type: string;
  members: IGroupMember[];
}

export interface IDeleteGroupMemberParams extends IApiUserGroupParams {
  address: string;
}

export interface ICancelGroupInvitationParams extends IApiUserGroupParams {
  email: string;
}

interface IApiBooleanResultResponse {
  result: boolean;
}

export interface IManageGroupInvitationResponse
  extends IApiBooleanResultResponse {}

export interface ILeaveGroupResponse extends IApiBooleanResultResponse {}

export interface InviteGroupMemeberParams extends IApiUserGroupParams {
  invitations: GroupInvitation[];
}

export interface GroupInvitation {
  email: string;
  role: GroupUserRole;
}

export interface InivteGroupMemberResponse {
  result: InviteGroupMemeberResult;
}

export interface InviteGroupMemeberResult {
  invitations: GroupInvitationResult[];
}

export interface GroupInvitationResult {
  email: string;
  success: boolean;
}

export interface IRenameGroupParams extends IApiUserGroupParams {
  name: string;
  comment: string;
  company_type: string;
}

export interface IGroupUser {
  address: Address;
  comment: string;
  companyType: string;
  id: string;
  isGroup: boolean;
  name: string;
}

export interface IRenameGroupResponse {
  user: IGroupUser;
}

export interface AcceptGroupInvitationParams {
  group: Web3Address;
  token: string;
}

export interface RejectGroupInvitationParams
  extends AcceptGroupInvitationParams {}
