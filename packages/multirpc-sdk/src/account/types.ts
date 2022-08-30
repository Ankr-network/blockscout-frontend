import { EmailConfirmationStatus, Web3Address } from '../common';

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
}

export interface IPaymentHistoryRequest {
  cursor?: number;
  from?: number;
  limit: number;
  order_by?: keyof IPaymentHistoryEntity;
  order?: 'asc' | 'desc';
  to?: number;
  type?: IPaymentHistoryEntityType[];
}

export interface IPaymentHistoryResponse {
  transactions: IPaymentHistoryEntity[];
  cursor: string;
}

export interface IBalance {
  // credit balance === balance_ankr === balance_usd
  balance: string;
  balance_ankr: string;
  balance_usd: string;
  balance_voucher: string;
}

export interface IBalanceEndTimeResult {
  NumberOfDaysEstimate: number;
}

export interface IDailyChargingParams {
  day_offset: number;
}

export type IDailyChargingResponse = string;

export interface IAggregatedPaymentHistoryRequest {
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
export interface IMethod {
  method: string;
  count: number;
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
  total_cost?: number;
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
}

export interface IApiPrivateStats {
  stats?: PrivateStatsInternal;
  total_requests?: number;
}

export interface PrivateStats {
  stats?: PrivateStatsInternal;
  totalRequests?: number;
}

export type BlockchainID = string;
export type PrivateStatsInternal = Partial<Record<BlockchainID, PrivateStat>>;

export enum PrivateStatsInterval {
  HOUR = 'h1',
  DAY = 'h24',
  WEEK = 'd7',
  MONTH = 'd30',
}

export enum WithdrawStatus {
  WITHDRAW_STATUS_UNKNOWN = 'WITHDRAW_STATUS_UNKNOWN',
  WITHDRAW_STATUS_PENDING = 'WITHDRAW_STATUS_PENDING',
  WITHDRAW_STATUS_WAITING = 'WITHDRAW_STATUS_WAITING',
  WITHDRAW_STATUS_READY = 'WITHDRAW_STATUS_READY',
  WITHDRAW_STATUS_COMPLETED = 'WITHDRAW_STATUS_COMPLETED',
}

export interface IWithdrawalStatusResponse {
  withdraw: {
    ankrAmount: string;
    handleTxHash: string;
    requestTxHash: string;
    status: WithdrawStatus;
    user: string;
  };
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
  CHANGE_WITH_SAME_EMAIL = 'trying to change binding with the same email: nothing todo',
  CHANGE_INEXISTENT = "binding with provided address in 'pending' status not found: not found",
  TOO_MANY_CHANGE_EMAIL_REQUESTS = 'sending confirmation codes too often: wrong state',
  TOO_MANY_RESEND_CONFIRMATION_REQUESTS = 'too many confirmation codes created: wrong state',
  ALREADY_CONFIRMED = 'binding with provided email already exists and confirmed: data exists already',
  LINK_EXPIRED = 'confirmation code has already expired: wrong state',
  EMAIL_BINDING_NOT_FOUND = 'not found',
  CONFIRMATION_CODE_NOT_FOUND = 'confirmation code not found: not found',
  CODE_ALREADY_USED = 'confirmation code has already been used: wrong state',
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

export interface INotificationsSettings {
  deposit?: boolean;
  withdraw?: boolean;
  voucher?: boolean;
  low_balance?: boolean;
  marketing?: boolean;
  balance_7days?: boolean;
  balance_3days?: boolean;
}
