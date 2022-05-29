import { IPaymentHistoryEntity } from 'multirpc-sdk';

import { ChartCurrency, ChartTimeframe } from '../types';
import { IChartData } from 'modules/common/components/Chart';
import { getTimeframeBorders } from './getTimeframeBorders';

export interface TransactionsParams {
  currency: ChartCurrency;
  payments: IPaymentHistoryEntity[];
  timeframe: ChartTimeframe;
}

type ValueKey = keyof Pick<IPaymentHistoryEntity, 'amountAnkr' | 'amountUsd'>;

const keysMap: Record<ChartCurrency, ValueKey> = {
  [ChartCurrency.ANKR]: 'amountAnkr',
  [ChartCurrency.USD]: 'amountUsd',
};

export const getTransactions = ({
  currency,
  payments,
  timeframe,
}: TransactionsParams): IChartData[] => {
  const transactions = payments.map<IChartData>(
    ({ timestamp, ...payment }) => ({
      time: new Date(Number(timestamp)),
      value: payment[keysMap[currency]],
    }),
  );

  if (!transactions.length) {
    const { from = new Date().getTime(), to = new Date().getTime() } =
      getTimeframeBorders(timeframe);

    return [from, to].map<IChartData>(time => ({
      time: new Date(time),
      value: 0,
    }));
  }

  return transactions;
};
