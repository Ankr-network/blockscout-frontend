import { Address } from '@ankr.com/provider';
import { Callback } from 'mixpanel-browser';
import {
  TPaymentHistoryEntityType,
  IApiUserGroupParams,
  EBlockchain,
} from 'multirpc-sdk';

import { TopUpCurrency } from 'modules/analytics/mixpanel/const';
import { TopUpTrackingParams } from 'modules/analytics/mixpanel/trackTopUp';

export enum AccountStatus {
  GREEN,
  YELLOW,
  RED,
  GREY,
}

export interface IPaymentHistoryTableEntity {
  amount: string;
  amountAnkr: string;
  amountUsd: string;
  creditAnkrAmount: string;
  creditUsdAmount: string;
  creditVoucherAmount: string;
  currencyAddress?: Address;
  network?: EBlockchain;
  reason: string;
  timestamp: string;
  txHash?: string;
  type: PaymentType;
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

export type TBudlesPaymentsType =
  | 'TRANSACTION_TYPE_DEAL_DEPOSIT'
  | 'TRANSACTION_TYPE_PACKAGE_DEPOSIT'; // package payment is deprecated

export type PaymentType =
  | TPaymentHistoryEntityType
  | TBudlesPaymentsType
  | 'ALL';

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
