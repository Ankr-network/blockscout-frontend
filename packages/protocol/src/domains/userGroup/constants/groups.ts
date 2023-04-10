export enum BlockWithPermission {
  ChainItem, // access to the chain item page
  UsageData, // access to the Telemetry,
  Billing, // access to the Billing information (account details page)
  Payment, // access to the payment form
  Disabled, // access disabled if group is selected (until https://ankrnetwork.atlassian.net/browse/MRPC-2703 will be resolved)
}

export const OWNER_PERMISSIONS = [
  BlockWithPermission.ChainItem,
  BlockWithPermission.UsageData,
  BlockWithPermission.Billing,
  BlockWithPermission.Payment,
];

export const DEVELOPER_PERMISSIONS = [
  BlockWithPermission.ChainItem,
  BlockWithPermission.UsageData,
];

export const FINANCE_PERMISSIONS = [
  BlockWithPermission.Billing,
  BlockWithPermission.Payment,
];

export const PERSONAL_GROUP_NAME = 'Personal';
