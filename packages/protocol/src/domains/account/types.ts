import { Callback } from 'mixpanel-browser';
import { IPaymentHistoryEntity, IPaymentHistoryEntityType } from 'multirpc-sdk';

import { TopUpCurrnecy } from 'modules/analytics/mixpanel/const';
import { TopUpTrackingParams } from 'modules/analytics/mixpanel/trackTopUp';

export enum BalanceStatus {
  GREEN,
  GREY,
  RED,
  YELLOW,
}

export enum AccountType {
  FREEMIUM,
  FREEMIUM_TRANSITION,
  OLD_PREMIUM,
  OLD_PREMIUM_EXPIRED,
  PREMIUM_ACTIVE,
  PREMIUM_INACTIVE,
  PREMIUM_TRANSITION,
  PREMIUM_UNKNOWN,
  PREMIUM_UNKNOWN_WITH_BALANCE,
  PREMIUM_WARNING,
  PREMIUM_WARNING_ZERO,
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
