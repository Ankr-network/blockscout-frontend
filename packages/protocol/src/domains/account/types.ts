import { Callback } from 'mixpanel-browser';
import { IPaymentHistoryEntity, IPaymentHistoryEntityType } from 'multirpc-sdk';

import { TopUpCurrnecy } from 'modules/analytics/mixpanel/const';
import { TopUpTrackingParams } from 'modules/analytics/mixpanel/trackTopUp';

export enum BalanceStatus {
  GREEN,
  RED,
  YELLOW,
}

export enum AccountType {
  NEW,
  PAYG_ACTIVE,
  PAYG_INACTIVE,
  PAYG_UNKNOWN,
  PAYG_UNKNOWN_WITH_BALANCE,
  PAYG_WARNING,
  PAYG_WARNING_ZERO,
  PREMIUM,
  PREMIUM_EXPIRED,
}

export enum Currency {
  ANKR,
  CREDIT,
}

export interface PaymentHistory {
  deductionsCursor: number;
  list: IPaymentHistoryEntity[];
  transactionsCursor: number;
}

export interface PaymentHistoryParams {
  deductionsCursor?: number;
  from: number;
  limit: number;
  loadedDeductions?: IPaymentHistoryEntity[];
  loadedTransactions?: IPaymentHistoryEntity[];
  to: number;
  transactionsCursor?: number;
  types?: IPaymentHistoryEntityType[];
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

export type PaymentType = IPaymentHistoryEntityType | 'ALL';

export type TrackTopUpSubmit = (
  amount: string,
  currency: TopUpCurrnecy,
  callback?: Callback,
) => void;

export type TrackTopUp = (
  params: Omit<TopUpTrackingParams, 'hasPremium' | 'address' | 'walletId'>,
) => void;

export enum TopUpOrigin {
  BILLING,
  ENDPOINTS,
  PRICING,
}
