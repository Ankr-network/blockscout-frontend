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
  // credit balance
  balance: string;
  balance_ankr: string;
  balance_usd: string;
}

export interface IBalanceEndTimeResult {
  NumberOfDaysEstimate: number;
}

export interface IRequestsEntity {
  chainId: string;
  number: number;
  method: string;
  errorCode: number;
  httpCode: number;
  responseTime: number;
  dateTime: string;
  costUsd: string;
  rawParams: string;
  rawResult: string;
}

export interface IRequestsRequest {
  cursor: number;
  limit: number;
  orderBy: keyof IPaymentHistoryEntity;
  order: 'asc' | 'desc';
}

export interface IRequestsResponse {
  requests: IRequestsEntity[];
  cursor: number;
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
export interface ITopRequest {
  count: number;
  topRequests: {
    method: string;
    count: number | 'others';
  }[];
}
export type Timestamp = string;
export interface ITopRequestStats {
  blockchain: string;
  counts: Record<Timestamp, ITopRequest>;
}

type ChartDate = string;
export type TopRequestsData = Record<string, number | ChartDate>;

export interface PrivateStat {
  blockchain: string;
  counts: PrivateStatCounts;
  totalRequests: number;
}

// in ms
export type PrivateStatTimestamp = string;
export type PrivateStatCounts = Record<PrivateStatTimestamp, PrivateStatCount>;
export interface PrivateStatCount {
  count: number;
  topRequests: PrivateStatTopRequests[];
}

export type RPCRequestName = string;
export interface PrivateStatTopRequests {
  count: number;
  method: RPCRequestName;
}

export interface PrivateStats {
  stats?: PrivateStatsInternal;
  totalRequests?: number;
}

export type BlockchainID = string;
export type PrivateStatsInternal = Record<BlockchainID, PrivateStat>;

export enum PrivateStatsInterval {
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

export interface IGetEmailBindingStatusesResponse {
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
