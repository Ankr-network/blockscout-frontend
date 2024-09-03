import { Milliseconds, Timestamp } from '@ankr.com/utils';

import {
  TPaymentHistoryEntityType,
  PrivateStats,
  PrivateStatsInterval,
  IEthUserAddressWithDeprecatedPublicKey,
  EmailConfirmationStatus,
  ELimitType,
} from '../accounting';
import { Network, Web3Address, BlockchainID } from '../common';

// just 200 http status code in case of success
export type EmptyResponse = Record<string, never>;

export interface ITransactionsEntity {
  amount?: string;
  amountAnkr: string;
  amountUsd: string;
  blockchain: Network;
  timestamp: string;
  type: TPaymentHistoryEntityType;
}

export interface ITransactionsRequest {
  address: Web3Address;
  blockchain?: string;
  cursor: number;
  limit: number;
  types?: TPaymentHistoryEntityType[];
  order_by?: string;
}

export interface ITransactionsResponse {
  transactions: ITransactionsEntity[];
  cursor: string;
}

export interface IBalancesEntity {
  address: Web3Address;
  amount: string; // deprecated. use creditAnkrAmount
  amountAnkr: string;
  amountUsd: string;
  creditAnkrAmount: string;
  creditUsdAmount: string;
  creditVoucherAmount: string;
  reference: string;
  // voucherAmount: string; // deprecated. use creditVoucherAmount
  voucherExpiresAt?: string;
}

export interface IBalancesRequest {
  search?: string;
  cursor?: number;
  limit?: number;
  order_by?: string;
  sort?: 'asc' | 'desc';
}

export interface IBalancesResponse {
  balances: IBalancesEntity[];
  cursor: string; // TODO: backend not sending yet
}

export interface IEmailBindingEntity {
  address: Web3Address;
  email: string;
  status: EmailConfirmationStatus;
}

export interface IEmailBindingsRequest {
  cursor?: string;
  limit?: number;
  filter_type?: 'email' | 'address';
  filter?: string;
}

export interface IEmailBindingsResponse {
  bindings?: IEmailBindingEntity[];
  cursor: string;
}

export interface IUpdateUserEmailRequest {
  address: Web3Address;
  email: string;
}

export interface IUpdateUserEmailResponse {
  binding: IEmailBindingEntity;
}

export interface IGetAdminRolesResponse {
  roles: string;
  roles_name: string;
}

export interface ICreateTestClientRequest {
  address: Web3Address;
  duration: number;
  name?: string;
  email?: string;
}

export interface ICreateTestClientResponse {
  token: string;
  id: string;
  address: Web3Address;
  tier: number;
  roles: string;
  name?: string;
  email?: string;
}

export interface IUserStatsRequest {
  address: Web3Address;
  interval: PrivateStatsInterval;
  current?: boolean; // set true if current day stats need to be included
}

export type IStatsTimeframe = 'm5' | 'm15' | 'h1' | 'd1';

export interface IUserStatsByRangeRequest {
  address: Web3Address;
  timeframe: IStatsTimeframe;
  from: Milliseconds;
  to: Milliseconds;
}

export type IUserStatsResponse = PrivateStats;

export interface IUsageDetailEntity {
  count: string;
  method: string;
  totalCost: string;
}

export interface IWebsocketStatsRequest {
  blockchain: string;
}

export interface IWebsocketStatsResponse {
  [address: Web3Address]: number;
  total: number;
}

export interface IArchiveRequestsStatsRequest {
  blockchain: string;
  user?: string;
}

export interface IArchiveRequestsStatsResponse {
  [timestamp: Timestamp]: number;
}

export interface IUsageEntity {
  blockchain: string;
  details: IUsageDetailEntity[];
}

export interface IStatementRequest {
  address: Web3Address;
  day_offset: string;
}

export interface IStatementResponse {
  statement: {
    user: Web3Address;
    usage?: IUsageEntity[];
  };
}

export type IAmountType = 'ankr' | 'usd' | 'credit';

export interface IAddVoucherCreditsRequest {
  address: Web3Address;
  amountType: IAmountType;
  amount: string;
  reasonId: string;

  /* * unix timestamp in seconds indicating the expiration time of total creditVoucherAmount. “0” value indicates that there is no timeout for deletion  */
  expiresAt?: string;
}

export interface IAddVoucherCreditsResponse {
  success: boolean;
}

export interface IUpdateVoucherCreditsRequest {
  address: Web3Address;
  amountType: IAmountType;
  amount: string;
  reasonId: string;
}

export interface IUpdateVoucherCreditsResponse {
  success: boolean;
}

export interface IGetUserTotalRequest {
  address: Web3Address;
}

interface ChainTotal {
  totalCost: string;
  totalCount: string;
}

export interface IGetUserTotalResponse {
  blockchainsInfo: {
    blockchains?: {
      avalanche?: ChainTotal;
      bsc?: ChainTotal;
      bsc_testnet_chapel?: ChainTotal;
      celo?: ChainTotal;
      eth?: ChainTotal;
      eth_sepolia?: ChainTotal;
      fantom?: ChainTotal;
      harmony?: ChainTotal;
      iotex_testnet?: ChainTotal;
      moonbeam?: ChainTotal;
      near?: ChainTotal;
      nervos_ckb?: ChainTotal;
      optimism?: ChainTotal;
      polygon?: ChainTotal;
      syscoin?: ChainTotal;
      tron?: ChainTotal;
    };
    startedMs?: string;
    totalCost?: string;
    totalCount?: string;
  };
}

export interface IUserProfileEntity {
  id: string;
  address: string;
  comment?: string;
  companyType?: string;
  name?: string;
}

export interface IUserProfileResponse {
  user: IUserProfileEntity;
}

export interface IGetUserProfileRequest {
  address: Web3Address;
}
export type IGetUserProfileResponse = IUserProfileResponse;

export interface IUpdateUserProfileRequest {
  address: Web3Address;
  comment?: string;
  companyType?: string;
  name?: string;
}

export type IUpdateUserProfileResponse = IUserProfileResponse;

export interface IUserByTokenRequest {
  token: string;
}

export interface IUserByTokenResponse {
  address: Web3Address;
  is_group: boolean;
  email: string;
}

export interface IUserTokensRequest {
  address: Web3Address;
}

export interface IUserTokensResponseEntity {
  id: string;
  origin: string;
  token: string;
  type: string;
  index: number;
}

export interface IUserTokensResponse {
  tokens: IUserTokensResponseEntity[];
}

export interface IGetUserRevenueRequest {
  address: Web3Address;
}

export interface IGetUserRevenueResponse {
  creditsAmount: string;
  usdAmount: string;
  ankrAmount: string;
  usdFact: string;
  ankrFact: string;
  totalCreditsAmount: string;
  totalUsdAmount: string;
}

export type GetUserAddressesRequest = {
  address: Web3Address;
};

export type IEthUserAddressV2 = Omit<
  IEthUserAddressWithDeprecatedPublicKey,
  'public_key'
>;

export type GetUserAddressesResponse = {
  addresses: IEthUserAddressV2[];
};

export type GetUsersRegistrationsFilter = 'devdao' | '';
export type GetUsersRegistrationsRequest = {
  from: Timestamp;
  to: Timestamp;
  filter: GetUsersRegistrationsFilter;
};

export type GetUsersRegistrationsResponse = {
  addresses: Web3Address[];
};

export type UserGroupRole =
  | 'GROUP_ROLE_OWNER'
  | 'GROUP_ROLE_DEV'
  | 'GROUP_ROLE_FINANCE'
  | 'GROUP_ROLE_ADMIN';

export type SetUserGroupRequest = {
  groupAddress: Web3Address;
  userAddress: Web3Address;
  role: UserGroupRole;
};

export type GroupMember = {
  address: Web3Address;
  role: UserGroupRole;
};

type UserGroupResponse = {
  name: string;
  address: Web3Address;
  members?: GroupMember[];
};

export type SetUserGroupResponse = UserGroupResponse;

export type DeleteFromUserGroupRequest = {
  group_address: Web3Address;
  user_address: Web3Address;
};

export type DeleteFromUserGroupResponse = UserGroupResponse;

export type CreateUserGroupRequest = {
  ownerAddress: Web3Address;
  groupName: string;
};

export type CreateUserGroupResponse = UserGroupResponse;

/* * Gets the list for groups filtered by participant’s ETH address (optional parameter),
 * returns ALL groups if not set  */
export type GetUserGroupsRequest = {
  user_address?: Web3Address;
};

export type UserGroupItem = {
  group_name: string;
  group_address: Web3Address;
};

export type GetUserGroupsResponse = {
  groups: UserGroupItem[];
};

export type GetUserGroupRequest = {
  address: Web3Address;
};

export type GetUserGroupResponse = UserGroupResponse;

export type DeleteUserGroupRequest = {
  address: Web3Address;

  /* * removeMembers: the value "true" allows you to delete a non-empty group by removing users from it automatically.
   * If set as false or not set, the group will be deleted ONLY if it is empty (has no members)  */
  removeMembers?: boolean;
};

export type DeleteUserGroupResponse = UserGroupResponse;

export type GetUserProjectsRequest = {
  address: Web3Address;
};

// example of response for UserProjectConfig.
// see details here: https://ankrnetwork.atlassian.net/wiki/spaces/PBRPC/pages/2032861185/Backoffice-gateway
// "{\"blockchains\":[\"near\",\"tron\"]}"
export type UserProjectConfig = string;

export type UserProject = {
  id: string;
  index: number;
  is_encrypted: boolean;
  name: string;
  description: string;
  config: UserProjectConfig;
};

export type GetUserProjectsResponse = UserProject[] | null;

export type SetUserProjectAllowedJwtNumberParams = {
  address: Web3Address;
  jwtLimit: number;
};

export type SetUserProjectAllowedJwtNumberResponse = EmptyResponse;

export type DeleteUserProjectByIndexParams = {
  address: Web3Address;
  index: number; // instead of index can be used id param from UserProject
};

export type DeleteUserProjectByIdParams = {
  address: Web3Address;
  id: string;
};

export type DeleteUserProjectParams =
  | DeleteUserProjectByIndexParams
  | DeleteUserProjectByIdParams;

export type DeleteUserProjectResponse = EmptyResponse;

export type LoggerScale = Record<BlockchainID, number>;

export interface ICountersEntity {
  hourly: number;
  daily: number;
  monthly: number;
  delta: number;
  timestamp: number;
  user: string;
  address?: Web3Address;
  ttl?: number;
  hash?: string;
  suspended?: boolean;
  loggerScale?: LoggerScale;
}

export interface ICountersEntityMapped extends ICountersEntity {
  createdAt: Date;
}

export interface ICounterRequest {
  user: string;
}

export interface ICounterResponse extends ICountersEntity { }

export interface ICountersRequest {
  limit?: number;
  cursor?: string;
}

export interface ICountersResponse {
  result: ICountersEntity[];
  cursor?: string;
}

export interface INodeEntity {
  id: string;
  blockchain: string;
  scheme: string;
  requestUrl: string;
  websocketUrl?: string;
  weight: number;
  continent: string;
  country: string;
  organization: string;
  city: string;
  features: string[];
  isArchive: boolean;
}

export interface IAddressBindingEntity {
  id: string;
  origin: string;
  token: string;
  type: string;
  index: number;
}

export interface IAddressBindingsRequest {
  address: Web3Address;
}

export interface IAddressBindingsResponse {
  tokens?: IAddressBindingEntity[];
}

export interface IGetExternalEmailResponse {
  external_email: string;
}

interface TwoFAData {
  type: string;
  status: 'none' | 'pending' | 'enabled';
}

export interface ITwoFAStatusResponse {
  '2FAs': TwoFAData[];
}

interface ILimitEntity {
  blockchain_paths: string;
  limit?: number;
  type: ELimitType;
}

export interface IBundleDataEntity {
  name: string;
  acvite: boolean;
  bundle_id: string;
  product_id: string;
  price_id: string;
  limits: ILimitEntity[];
  immutable_limits: [];
  duration: number;
  created_at: number;
  updated_at: number;
}

export interface IBundlesResponse {
  bundles: IBundleDataEntity[];
}

interface IBudleStatusCursor {
  blockchainPaths: string;
  allowance: number;
  count: number;
  type: string;
  usagePercentage: number;
}

export interface IBundleStatusEntity {
  counters: IBudleStatusCursor[];
  expires: number;
  bundleId: string;
  paymentId: string;
  maxUsagePercentage: number;
}

export interface IBundlesStatusesResponse {
  bundles: IBundleStatusEntity[];
}

export interface IRevokeBundleResponseItem {
  action: string;
  code: number;
  message: string;
}

interface IReferralCodeBonus {
  valid_from?: number;
  valid_until?: number;
  bundle_id?: string;
  voucher?: {
    currency: string;
    amount: string;
    expires_at: number;
  }
}

interface IReferralCodeDetails {
  code: string;
  referrer: string;
  bonus: IReferralCodeBonus;
  created_at: number;
  deleted_at?: number;
}

export interface IReferralCodeItem {
  code: string;
  name?: string;
  details: IReferralCodeDetails[];
}

export interface INewReferralCodeRequest {
  address: string;
  name: string;
  bonus?: IReferralCodeBonus;
}

export interface INewReferralCodeResponse {
  code: string;
}

export interface IDeleteReferralCodeResponse {
  success: boolean;
}
