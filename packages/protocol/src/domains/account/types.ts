import { Callback } from 'mixpanel-browser';
import { TPaymentHistoryEntityType, IApiUserGroupParams } from 'multirpc-sdk';

import { TopUpCurrency } from 'modules/analytics/mixpanel/const';
import { TopUpTrackingParams } from 'modules/analytics/mixpanel/trackTopUp';

export enum AccountIcon {
  INFO = 'info',
  WARNING = 'warning',
  ERROR = 'error',
}

export enum AccountStatus {
  GREEN,
  YELLOW,
  RED,
  GREY,
}

export interface AccountState {
  descriptionKey?: string;
  isPAYG: boolean;
  status: AccountStatus;
  icon?: AccountIcon;
}

export interface IPaymentHistoryTableEntity {
  timestamp: string;
  type: PaymentType;
  amountUsd: string;
  amountAnkr: string;
  amount: string;
  creditAnkrAmount: string;
  creditUsdAmount: string;
  creditVoucherAmount: string;
  txHash?: string;
}

export interface PaymentHistory {
  deductionsCursor: number;
  list: IPaymentHistoryTableEntity[];
  transactionsCursor: number;
  myBundlesPaymentsCursor: number;
}

export interface PaymentHistoryParams extends IApiUserGroupParams {
  deductionsCursor?: number;
  from: number;
  limit: number;
  loadedDeductions?: IPaymentHistoryTableEntity[];
  loadedTransactions?: IPaymentHistoryTableEntity[];
  loadedMyBundlesPayments?: IPaymentHistoryTableEntity[];
  to: number;
  transactionsCursor?: number;
  myBundlesPaymentsCursor?: number;
  types?: PaymentType[];
  isPaginationRequest?: boolean;
}

export enum PaymentHistoryTableTimeframe {
  WEEK,
  MONTH,
  YEAR,
}

export interface PaymentHistoryTableTimeframeBorders {
  from: number;
  to: number;
}

export type PaymentType =
  | TPaymentHistoryEntityType
  | 'ALL'
  | 'TRANSACTION_TYPE_DEAL_DEPOSIT';

export type TrackTopUpSubmit = (
  amount: string,
  currency: TopUpCurrency,
  callback?: Callback,
) => void;

export type TrackTopUp = (
  params: Omit<TopUpTrackingParams, 'hasPremium' | 'address' | 'walletId'>,
) => void;

export enum TopUpOrigin {
  BILLING,
  ENDPOINTS,
  PRICING,
  PROJECTS,
}
