import { IAggregatedPaymentHistoryRequest } from 'multirpc-sdk';

export enum ExpenseChartTimeframe {
  OneWeek,
  OneMonth,
  ThreeMonth,
  OneYear,
  All,
}

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
