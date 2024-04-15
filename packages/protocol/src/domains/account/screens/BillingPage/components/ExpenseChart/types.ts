import { IAggregatedPaymentHistoryRequest } from 'multirpc-sdk';

export enum ChartCurrency {
  ANKR,
  USD,
  CREDIT,
}

export enum ChartTimeframe {
  ALL,
  MONTH,
  THREE_MONTHS,
  WEEK,
  YEAR,
}

export type ChartTimeframeBorders = Pick<
  IAggregatedPaymentHistoryRequest,
  'from' | 'to'
>;
