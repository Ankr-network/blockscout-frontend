export type IPaymentHistoryEntityType =
  | 'TRANSACTION_TYPE_UNKNOWN'
  | 'TRANSACTION_TYPE_DEPOSIT'
  | 'TRANSACTION_TYPE_DEDUCTION'
  | 'TRANSACTION_TYPE_WITHDRAW'
  | 'TRANSACTION_TYPE_BONUS'
  | 'TRANSACTION_TYPE_COMPENSATION';

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
  topRequests: PrivateStatTopRequests;
  totalRequests: number;
}

// key is a timestamp in ms
export type PrivateStatCounts = Record<string, number>;

// key is a method name
export type PrivateStatTopRequests = Record<string, number>;

export interface PrivateStats {
  stats?: PrivateStatsInternal;
  totalRequests?: number;
}

// key is a blockchain name
export type PrivateStatsInternal = Record<string, PrivateStat>;

export enum PrivateStatsInterval {
  DAY = 'h24',
  WEEK = 'd7',
  MONTH = 'd30',
}
