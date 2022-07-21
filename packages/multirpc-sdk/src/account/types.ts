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
  cursor: number;
  limit: number;
  order_by: keyof IPaymentHistoryEntity;
  order: 'asc' | 'desc';
}

export interface IPaymentHistoryReponse {
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

export type IDailyChargingReponse = string;

export interface IAggregatedPaymentHistoryRequest {
  blockchains?: string[];
  limit?: number;
  types: IPaymentHistoryEntityType[];
  from?: number;
  to?: number;
  time_group: 'TOTAL' | 'DAY' | 'HOUR';
}

export interface IAggregatedPaymentHistoryReponse {
  transactions: IPaymentHistoryEntity[];
}

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
  WITHDRAW_STATUS_COMPLETED = 'WITHDRAW_STATUS_COMPLETED'
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
