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
  isConnected: boolean;
  timeframe: ChartTimeframe;
}

export type PaymentHistory = [IPaymentHistoryEntity[], boolean];

export const usePaymentHistory = ({
  isConnected,
  timeframe,
}: PaymentHistoryParams): PaymentHistory => {
  const {
    data: { transactions = [] },
    loading,
  } = useQuery({ defaultData, type: fetchExpenseChartData });

  const dispatch = useDispatchRequest();

  useEffect(() => {
    if (isConnected) {
      const borders = getTimeframeBorders(timeframe);

      dispatch(
        fetchExpenseChartData({
          ...borders,
          time_group: 'DAY',
          types: ['TRANSACTION_TYPE_DEDUCTION'],
        }),
      );
    }
  }, [dispatch, isConnected, timeframe]);

  return [transactions, loading];
};
