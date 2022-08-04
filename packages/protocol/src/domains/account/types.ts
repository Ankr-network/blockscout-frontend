import { IPaymentHistoryEntity, IPaymentHistoryEntityType } from 'multirpc-sdk';

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
