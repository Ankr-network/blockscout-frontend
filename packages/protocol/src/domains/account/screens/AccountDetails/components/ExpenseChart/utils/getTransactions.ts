import { IPaymentHistoryEntity } from 'multirpc-sdk';

import { IChartData } from 'modules/common/components/Chart';
import { ChartCurrency, ChartTimeframe } from '../types';
import { getTimeframeBorders } from './getTimeframeBorders';

export interface TransactionsParams {
  currency: ChartCurrency;
  payments: IPaymentHistoryEntity[];
  timeframe: ChartTimeframe;
}

type ValueKey = keyof Pick<
  IPaymentHistoryEntity,
  'amountAnkr' | 'amountUsd' | 'amount'
>;

const keysMap: Record<ChartCurrency, ValueKey> = {
  [ChartCurrency.ANKR]: 'amountAnkr',
  [ChartCurrency.USD]: 'amountUsd',
  [ChartCurrency.CREDIT]: 'amount',
};

const injectExtremes = (
  transactions: IChartData[],
  timeframe: ChartTimeframe,
): IChartData[] => {
  const { from = new Date().getTime(), to = new Date().getTime() } =
    getTimeframeBorders(timeframe);

  const extremes = [from, to].map<IChartData>(time => ({
    time: new Date(time),
    value: 0,
  }));

  extremes.length -= Math.min(transactions.length, extremes.length);

  return [...extremes, ...transactions];
};

export const getTransactions = ({
  currency,
  payments,
  timeframe,
}: TransactionsParams): IChartData[] => {
  const transactions = payments
    .map<IChartData>(({ timestamp, ...payment }) => ({
      time: new Date(Number(timestamp)),
      value: Number(payment[keysMap[currency]]),
    }))
    .sort((a, b) => a.time.getTime() - b.time.getTime());

  return injectExtremes(transactions, timeframe);
};
