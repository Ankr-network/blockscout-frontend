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
  ProjectsWelcomeDialog, // permissions to see welcome dialog (projects page)
  StatusTransition, // permissions to have status transition state
  EnterpriseStatus, // permissions to request group enterprise status

  // Teams permissions
  TeamManagement, // permissions to manage team (roles, invites, delete members)
  TeamOwnershipTransfer, // permissions to transfer team ownership
  TeamRenaming, // permission to rename existing team
}

export const ADMIN_PERMISSIONS = [
  BlockWithPermission.ChainItem,
  BlockWithPermission.UsageData,
  BlockWithPermission.Billing,
  BlockWithPermission.Payment,
  BlockWithPermission.JwtManagerWrite,
  BlockWithPermission.JwtManagerRead,
  BlockWithPermission.AccountStatus,
  BlockWithPermission.TosStatus,
  BlockWithPermission.UpgradePlan,
  BlockWithPermission.ProjectsWelcomeDialog,
  BlockWithPermission.StatusTransition,
  BlockWithPermission.EnterpriseStatus,
  BlockWithPermission.TeamManagement,
];

export const OWNER_PERMISSIONS = [
  ...ADMIN_PERMISSIONS,
  BlockWithPermission.TeamOwnershipTransfer,
  BlockWithPermission.TeamRenaming,
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
];

export const PERSONAL_GROUP_NAME = 'Personal';
