import { IApiUserGroupParams } from '../userGroup';

export interface IAggregatedPaymentHistoryResponse {
  transactions: IPaymentHistoryEntity[];
  cursor: string;
}

export type TPaymentHistoryEntityType =
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
  types?: TPaymentHistoryEntityType[];
}

export enum AggregatedPaymentHistoryTimeGroup {
  DAY = 'DAY',
  HOUR = 'HOUR',
  TOTAL = 'TOTAL',
}

export interface IPaymentHistoryEntity {
  timestamp: string;
  type: TPaymentHistoryEntityType;
  amountUsd: string;
  amountAnkr: string;
  amount: string;
  creditAnkrAmount: string;
  creditUsdAmount: string;
  creditVoucherAmount: string;
  reason: string; // txHash or id
}

export interface IPaymentHistoryRequest extends IApiUserGroupParams {
  cursor?: number;
  from?: number;
  limit: number;
  order_by?: keyof IPaymentHistoryEntity;
  order?: 'asc' | 'desc';
  to?: number;
  type?: TPaymentHistoryEntityType[];
}

export interface IPaymentHistoryResponse {
  transactions?: IPaymentHistoryEntity[];
  cursor: string;
}

export interface IMyBundlesPaymentsRequest extends IApiUserGroupParams {
  bundle_id?: string;
  cursor?: number;
  from?: number;
  to?: number;
  limit?: number;
  only_successful?: boolean;
}

export enum ELimitType {
  QTY = 'QTY',
  COST = 'COST',
}

interface ILimitEntity {
  blockchain_paths: string;
  limit?: number;
  type: ELimitType;
}

interface IBundleDataEntity {
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

export enum EBundleStatus {
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
}

export interface IBundleEntity {
  bundle: IBundleDataEntity;
  purchased_at: number;
  expires_at: number;
  status: EBundleStatus;
  payment_id: string;
}

export interface IMyBundlesPaymentsResponse {
  bundles: IBundleEntity[];
  cursor: string;
}