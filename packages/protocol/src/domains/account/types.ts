import { Callback } from 'mixpanel-browser';
import {
  IPaymentHistoryEntity,
  IPaymentHistoryEntityType,
  IApiUserGroupParams,
} from 'multirpc-sdk';

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

export interface PaymentHistory {
  deductionsCursor: number;
  list: IPaymentHistoryEntity[];
  transactionsCursor: number;
}

export interface PaymentHistoryParams extends IApiUserGroupParams {
  deductionsCursor?: number;
  from: number;
  limit: number;
  loadedDeductions?: IPaymentHistoryEntity[];
  loadedTransactions?: IPaymentHistoryEntity[];
  to: number;
  transactionsCursor?: number;
  types?: IPaymentHistoryEntityType[];
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

export type PaymentType = IPaymentHistoryEntityType | 'ALL';

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
