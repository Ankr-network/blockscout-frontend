import {
  AggregatedPaymentHistoryTimeGroup,
  IAggregatedPaymentHistoryResponse,
  IPaymentHistoryEntity,
} from 'multirpc-sdk';
import { useEffect } from 'react';

import { ChartTimeframe } from '../types';
import { getTimeframeBorders } from '../utils/getTimeframeBorders';
import { useLazyAccountFetchExpenseChartDataQuery } from 'domains/account/actions/fetchExpenseChartData';

const defaultData: IAggregatedPaymentHistoryResponse = {
  transactions: [],
  cursor: '-1',
};

export interface PaymentHistoryParams {
  hasCredentials: boolean;
  timeframe: ChartTimeframe;
}

export type PaymentHistory = [IPaymentHistoryEntity[], boolean];

export const usePaymentHistory = ({
  hasCredentials,
  timeframe,
}: PaymentHistoryParams): PaymentHistory => {
  const [fetchExpenseChartData, { data = defaultData, isLoading }] =
    useLazyAccountFetchExpenseChartDataQuery();

  useEffect(() => {
    if (hasCredentials) {
      const borders = getTimeframeBorders(timeframe);

      fetchExpenseChartData({
        ...borders,
        time_group: AggregatedPaymentHistoryTimeGroup.DAY,
        types: ['TRANSACTION_TYPE_DEDUCTION'],
      });
    }
  }, [fetchExpenseChartData, hasCredentials, timeframe]);

  const { transactions = [] } = data;

  return [transactions, isLoading];
};
