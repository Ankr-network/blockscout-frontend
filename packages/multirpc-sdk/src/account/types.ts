import {
  EmailConfirmationStatus,
  Web3Address,
  BlockchainID,
  Timeframe,
} from '../common';

export interface IApiUserGroupParams {
  group?: Web3Address;
  totp?: string;
}

export interface AccountError {
  code: AccountErrorCode;
  message: string;
}

export enum AccountErrorCode {
  Aborted = 'aborted',
  AlreadyExists = 'already_exists',
  DatabaseError = 'database_error',
  FailedPrecondition = 'failed_precondition',
  InternalError = 'internal_error',
  InvalidArgument = 'invalid_argument',
  NotFound = 'not_found',
  NothingTodo = 'nothing_todo',
  Unavailable = 'unavailable',
  WrongFormat = 'wrong_format',
  WrongState = 'wrong_state',
  TwoFARequired = '2fa_required',
  TwoFAWrong = '2fa_wrong',
}

export interface AccountErrorResponse {
  error: AccountError;
}

export enum PermissionErrorCode {
  Permission = 'permission',
}

export interface PermissionError {
  code: PermissionErrorCode;
  message: string;
}

export interface PermissionErrorResponse {
  error: PermissionError;
}

export type IPaymentHistoryEntityType =
  | 'TRANSACTION_TYPE_UNKNOWN'
  | 'TRANSACTION_TYPE_DEPOSIT'
  | 'TRANSACTION_TYPE_DEDUCTION'
  | 'TRANSACTION_TYPE_WITHDRAW'
  | 'TRANSACTION_TYPE_BONUS'
  | 'TRANSACTION_TYPE_COMPENSATION'
  | 'TRANSACTION_TYPE_VOUCHER_TOPUP'
  | 'TRANSACTION_TYPE_VOUCHER_ADJUST'
  | 'TRANSACTION_TYPE_WITHDRAW_INIT'
  | 'TRANSACTION_TYPE_WITHDRAW_ADJUST';

export interface IPaymentHistoryEntity {
  timestamp: string;
  type: IPaymentHistoryEntityType;
  amountUsd: string;
  amountAnkr: string;
  amount: string;
  creditAnkrAmount: string;
  creditUsdAmount: string;
  creditVoucherAmount: string;
}

export interface IPaymentHistoryRequest extends IApiUserGroupParams {
  cursor?: number;
  from?: number;
  limit: number;
  order_by?: keyof IPaymentHistoryEntity;
  order?: 'asc' | 'desc';
  to?: number;
  type?: IPaymentHistoryEntityType[];
}

export interface IPaymentHistoryResponse {
  transactions?: IPaymentHistoryEntity[];
  cursor: string;
}

export interface IBalance {
  // credit balance === balance_ankr === balance_usd
  balance: string;
  balance_ankr: string;
  balance_usd: string;
  balance_voucher: string;
}

export interface IDailyChargingParams extends IApiUserGroupParams {
  day_offset: number;
}

export type IDailyChargingResponse = string;

export interface IAggregatedPaymentHistoryRequest extends IApiUserGroupParams {
  blockchains?: string[];
  cursor?: number;
  from?: number;
  limit?: number;
  time_group: AggregatedPaymentHistoryTimeGroup;
  to?: number;
  types?: IPaymentHistoryEntityType[];
}

export enum AggregatedPaymentHistoryTimeGroup {
  DAY = 'DAY',
  HOUR = 'HOUR',
  TOTAL = 'TOTAL',
}

export interface IAggregatedPaymentHistoryResponse {
  transactions: IPaymentHistoryEntity[];
  cursor: string;
}

export interface ISubscriptionsResponse {
  items: ISubscriptionsItem[];
}

export interface ISubscriptionsItem {
  amount: string;
  currency: string;
  currentPeriodEnd: string;
  customerId: string;
  id: string;
  productId: string;
  recurringInterval: string;
  recurringIntervalCount: string;
  status: string;
  subscriptionId: string;
  type: string;
}

export interface IApiCancelSubscriptionRequestParams {
  subscription_id: string;
}

type ChartDate = string;
export type PrivateStatTopRequestsData = Record<string, number | ChartDate>;

export type PrivateStatOthersInfo = {
  request_count?: number;
  type_count?: number;
  total_cost?: number;
};

export interface PrivateTotalRequestsInfo {
  count: number;
  others_info: PrivateStatOthersInfo;
  top_requests: PrivateStatTopRequests[];
  topRequests: PrivateStatTopRequests[];
  total_cost?: number;
  totalCost?: number;
}

export interface PrivatStatTopCountry {
  country: string;
  count: number;
  total_cost: number;
}

export interface PrivateStatCountriesCount {
  others_info: PrivateStatOthersInfo;
  top_countries: PrivatStatTopCountry[];
}

export interface IpDetails {
  ip: string;
  count: number;
  total_cost: number;
}

export interface PrivateStatIPsCount {
  others_info?: PrivateStatOthersInfo;
  top_ips?: IpDetails[];
}

export interface PrivateStat {
  blockchain: string;
  countries_count: PrivateStatCountriesCount;
  counts?: PrivateStatCounts;
  ips_count: PrivateStatIPsCount;
  total: PrivateTotalRequestsInfo;
  total_requests: number;
  totalRequests: number;
}

// in ms
export type PrivateStatTimestamp = string;
export type PrivateStatCounts = Record<PrivateStatTimestamp, PrivateStatCount>;
export interface PrivateStatCount {
  count: number;
  top_requests: PrivateStatTopRequests[];
  others_info: PrivateStatOthersInfo;
}

export type RPCRequestName = string;
export interface PrivateStatTopRequests {
  method: RPCRequestName;
  count: number;
  total_cost: number;
  totalCost?: string; // used in backoffice stats response
}

export interface IApiPrivateStats {
  stats?: PrivateStatsInternal;
  total_requests?: number;
}

export interface PrivateStats {
  error?: string;
  stats?: PrivateStatsInternal;
  total_requests?: number;
  totalRequests?: number;
}

export type UserRequest = Record<string, number>;
export type UserRequestsResponse = Record<string, UserRequest>;

export type IApiGetUserRequestsParams = IApiUserGroupParams & {
  timeframe: Timeframe;
  userToken: string;
};

export type PrivateStatsInternal = Partial<Record<BlockchainID, PrivateStat>>;

export enum PrivateStatsInterval {
  HOUR = 'h1',
  DAY = 'h24',
  WEEK = 'd7',
  MONTH = 'd30',
}
export enum PublicStatsInterval {
  HOUR = '1h',
  DAY = '24h',
  WEEK = '7d',
  MONTH = '30d',
}

export interface IGetActiveEmailBindingResponse {
  address: string;
  email: string;
}

export interface IGetEmailBindingsResponse {
  bindings: IEmailResponse[];
}

export enum EmailErrorMessage {
  ADDRESS_PENDING_OTHER_EMAIL_BINDING = "binding with provided address and 'pending' status already exists: data exists already",
  ALREADY_CONFIRMED = 'binding with provided email already exists and confirmed: data exists already',
  CHANGE_INEXISTENT = "binding with provided address in 'pending' status not found: not found",
  CHANGE_WITH_SAME_EMAIL = 'trying to change binding with the same email: nothing todo',
  CODE_ALREADY_USED = 'confirmation code has already been used: wrong state',
  CONFIRMATION_CODE_NOT_FOUND = 'confirmation code not found: not found',
  EMAIL_BINDING_NOT_FOUND = 'not found',
  LINK_EXPIRED = 'confirmation code has already expired: wrong state',
  TOO_MANY_CHANGE_EMAIL_REQUESTS = 'sending confirmation codes too often: wrong state',
  TOO_MANY_RESEND_CONFIRMATION_REQUESTS = 'too many confirmation codes created: wrong state',
}

export interface IEmailResponseError {
  code: 'already_exists' | 'failed_precondition' | 'not_found' | string;
  message: EmailErrorMessage;
  params?: {
    resendableInMs?: number;
  };
}

export interface IEmailResponse {
  address: Web3Address;
  email: string;
  status: EmailConfirmationStatus;
  expiresAt: string;
  error?: IEmailResponseError;
}

interface ICreditThreshold {
  value: number;
}

export interface INotificationsSettings {
  deposit?: boolean;
  withdraw?: boolean;
  voucher?: boolean;
  low_balance?: boolean;
  marketing?: boolean;
  credit_info?: boolean;
  credit_warn?: boolean;
  credit_alarm?: boolean;
  credit_info_threshold?: ICreditThreshold;
  credit_warn_threshold?: ICreditThreshold;
  credit_alarm_threshold?: ICreditThreshold;
}

export interface ICanPayByCardResponse {
  isEligible: boolean;
}

export interface IGetLinkForCardPaymentRequest {
  amount: string;
  publicKey?: string;
}

export interface IGetLinkForRecurrentCardPaymentRequest {
  currency: string;
  product_price_id: string;
  public_key?: string;
}

export interface IGetLinkForCardPaymentResponse {
  url: string;
}

export interface ProductPrice {
  id: string;
  amount: string;
  currency: string;
  interval: string;
  intervalCount: string;
  type: string;
}

export interface IGetSubscriptionPricesResponse {
  productPrices: ProductPrice[];
}

export interface IGetLatestRequestsRequest {
  from_ms?: number;
  to_ms?: number;
  cursor?: number;
  group?: Web3Address;
  limit: number;
}

export interface LatestRequest {
  blockchain: string;
  premium_id: string;
  payload: string;
  ts: number;
  ip: string;
  country: string;
}

export interface IGetLatestRequestsResponse {
  user_requests: LatestRequest[];
}

export interface ICheckInstantJwtParticipantResponse {
  is_participant: boolean;
}

export interface IGetOrCreateInstantJwt {
  jwt_data: string;
  is_encrypted: boolean;
}

export interface IGetGroupJwtRequestParams {
  group: Web3Address;
}

export interface IGetGroupJwtResponse {
  jwt_data: string;
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

export interface InitTwoFAResponse {
  passcode: string;
  qr_code: string;
  issuer: string;
  account: string;
}

export enum TwoFAStatus {
  None = 'none',
  Pending = 'pending',
  Enabled = 'enabled',
}

interface TOTP {
  type: 'TOTP';
  status: TwoFAStatus;
}

export interface TwoFAStatusResponse {
  '2FAs': TOTP[];
}

export interface ConfirmTwoFARequestParams {
  totp: string;
}

export type ConfirmTwoFAResponse = Record<string, unknown>;

export type DisableTwoFAResponse = Record<string, unknown>;

export interface EmailBindingParams {
  email: string;
  totp?: string;
}

export interface TotalStatsResponse {
  blockchains_info: TotalStatsBlockchainsInfo;
}

export interface TotalStatsBlockchainsInfo {
  blockchains: TotalStatsBlockchains;
  premium_tokens: TotalStatsPremiumTokens;
  started_ms: number;
  total_cost: number;
  total_count: number;
}

export type TotalStatsBlockchains = Record<BlockchainID, TotalStatsBlockchain>;

export type UserEndpointToken = string;

export type TotalStatsPremiumTokens = Record<
  UserEndpointToken,
  TotalStatsPremiumToken
>;

export type TotalStatsPremiumToken = Omit<
  TotalStatsBlockchainsInfo,
  'premium_tokens'
>;

export interface TotalStatsBlockchain {
  total_cost: number;
  total_count: number;
}

export interface NegativeBalanceTermsOfServicesStatusParams {
  group: Web3Address;
}

export interface NegativeBalanceTermsOfServicesStatusResponse {
  tosAccepted: boolean;
}

export interface BundlePaymentPlan {
  bundle: BundlePlan;
  price: ProductPrice;
}

export interface BundlePlan {
  active: boolean;
  bundle_id: string;
  created_at: number;
  duration: number;
  limits: BundleLimit[];
  name: string;
  price_id: string;
  product_id: string;
  updated_at: number;
}

export interface BundleLimit {
  blockchain_path: string;
  limit?: number;
  type: BundleLimitType;
}

export enum BundleLimitType {
  UNKNOWN = 0,
  QTY = 1,
  COST = 2,
}

export interface GetLinkForBundlePaymentRequest {
  product_id: string;
  product_price_id: string;
}
