import {
  IAggregatedPaymentHistoryReponse,
  IPaymentHistoryEntity,
} from 'multirpc-sdk';
import { useDispatchRequest, useQuery } from '@redux-requests/react';
import { useEffect } from 'react';

import { ChartTimeframe } from '../types';
import { fetchPaymentHistory } from 'domains/account/actions/fetchPaymentHistory';
import { getTimeframeBorders } from '../utils/getTimeframeBorders';

const type = fetchPaymentHistory.toString();
const requestKey = 'chart';
const defaultData: IAggregatedPaymentHistoryReponse = {
  transactions: [],
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
  } = useQuery<IAggregatedPaymentHistoryReponse>({
    defaultData,
    requestKey,
    type,
  });

  const dispatch = useDispatchRequest();

  useEffect(() => {
    if (isConnected) {
      const borders = getTimeframeBorders(timeframe);

      dispatch(
        fetchPaymentHistory(
          {
            ...borders,
            time_group: 'DAY',
            types: ['TRANSACTION_TYPE_DEDUCTION'],
          },
          requestKey,
        ),
      );
    }
  }, [dispatch, isConnected, timeframe]);

  return [transactions, loading];
};
