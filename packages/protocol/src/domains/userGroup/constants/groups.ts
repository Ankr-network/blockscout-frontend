import { GroupUserRole } from 'multirpc-sdk';

export enum BlockWithPermission {
  ChainItem, // access to the chain item page
  UsageData, // access to the Telemetry,
  Billing, // access to the Billing information (account details page)
  Payment, // access to the payment form
  JwtManagerWrite, // permissions to create or delete project
  JwtManagerRead, // permissions see the list of JWTs
  AccountStatus, // access to account status information
  TosStatus, // access to the TOS status information
  UpgradePlan, // permissions to upgrade current plan
}

export const OWNER_PERMISSIONS = [
  BlockWithPermission.ChainItem,
  BlockWithPermission.UsageData,
  BlockWithPermission.Billing,
  BlockWithPermission.Payment,
  BlockWithPermission.JwtManagerWrite,
  BlockWithPermission.JwtManagerRead,
  BlockWithPermission.AccountStatus,
  BlockWithPermission.TosStatus,
  BlockWithPermission.UpgradePlan,
];

export const DEVELOPER_PERMISSIONS = [
  BlockWithPermission.ChainItem,
  BlockWithPermission.UsageData,
  BlockWithPermission.JwtManagerRead,
  BlockWithPermission.AccountStatus,
];

export const FINANCE_PERMISSIONS = [
  BlockWithPermission.Billing,
  BlockWithPermission.Payment,
  BlockWithPermission.TosStatus,
  BlockWithPermission.AccountStatus,
];

export const PERSONAL_GROUP_NAME = 'Personal';

enum GroupUser {
  Developer = 'Developer',
  Financial = 'Financial Manager',
  Admin = 'Admin',
}

export const GroupUserRoleMap: Record<GroupUserRole, GroupUser> = {
  [GroupUserRole.dev]: GroupUser.Developer,
  [GroupUserRole.finance]: GroupUser.Financial,
  [GroupUserRole.owner]: GroupUser.Admin,
};
