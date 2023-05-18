import {
  AggregatedPaymentHistoryTimeGroup,
  IAggregatedPaymentHistoryResponse,
  IPaymentHistoryEntity,
} from 'multirpc-sdk';
import { useEffect, useRef } from 'react';

import { ChartTimeframe } from '../types';
import { getTimeframeBorders } from '../utils/getTimeframeBorders';
import { useLazyAccountFetchExpenseChartDataQuery } from 'domains/account/actions/fetchExpenseChartData';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';

const defaultData: IAggregatedPaymentHistoryResponse = {
  transactions: [],
  cursor: '-1',
};

export interface PaymentHistoryParams {
  hasPrivateAccess: boolean;
  timeframe: ChartTimeframe;
}

export type PaymentHistory = [IPaymentHistoryEntity[], boolean];

export const usePaymentHistory = ({
  hasPrivateAccess,
  timeframe,
}: PaymentHistoryParams): PaymentHistory => {
  const [fetchExpenseChartData, { data = defaultData, isLoading }] =
    useLazyAccountFetchExpenseChartDataQuery();

  const { selectedGroupAddress: group } = useSelectedUserGroup();

  const groupRef = useRef(group);
  const timeframeRef = useRef(timeframe);

  useEffect(() => {
    const isGroupChanged = groupRef.current !== group;
    const isTimeframeChanged = timeframeRef.current !== timeframe;
    if (hasPrivateAccess) {
      const borders = getTimeframeBorders(timeframe);

      const request = fetchExpenseChartData({
        ...borders,
        time_group: AggregatedPaymentHistoryTimeGroup.DAY,
        types: ['TRANSACTION_TYPE_DEDUCTION'],
        group,
      });

      if (isGroupChanged || isTimeframeChanged) {
        request.abort();
        groupRef.current = group;
        timeframeRef.current = timeframe;

        // We need this timeout in order to refetch new data after the first request is aborted in case of changing group or timeframe
        setTimeout(request.refetch, 0);
      }

      return request.abort;
    }

    return () => {};
  }, [fetchExpenseChartData, hasPrivateAccess, timeframe, group]);

  const { transactions = [] } = data;

  return [transactions, isLoading];
};
