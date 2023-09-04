import { IApiUserGroupParams } from '../userGroup';

export interface IAggregatedPaymentHistoryResponse {
  transactions: IPaymentHistoryEntity[];
  cursor: string;
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