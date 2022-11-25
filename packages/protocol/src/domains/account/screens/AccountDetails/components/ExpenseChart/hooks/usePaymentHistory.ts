import {
  IAggregatedPaymentHistoryResponse,
  IPaymentHistoryEntity,
} from 'multirpc-sdk';
import { useDispatchRequest, useQuery } from '@redux-requests/react';
import { useEffect } from 'react';

import { ChartTimeframe } from '../types';
import { getTimeframeBorders } from '../utils/getTimeframeBorders';
import { fetchExpenseChartData } from 'domains/account/actions/fetchExpenseChartData';

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
  const {
    data: { transactions = [] },
    loading,
  } = useQuery({ defaultData, type: fetchExpenseChartData });

  const dispatch = useDispatchRequest();

  useEffect(() => {
    if (hasCredentials) {
      const borders = getTimeframeBorders(timeframe);

      dispatch(
        fetchExpenseChartData({
          ...borders,
          time_group: 'DAY',
          types: ['TRANSACTION_TYPE_DEDUCTION'],
        }),
      );
    }
  }, [dispatch, hasCredentials, timeframe]);

  return [transactions, loading];
};
