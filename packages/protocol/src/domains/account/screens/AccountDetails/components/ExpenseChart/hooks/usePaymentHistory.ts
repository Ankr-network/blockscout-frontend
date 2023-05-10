import {
  AggregatedPaymentHistoryTimeGroup,
  IAggregatedPaymentHistoryResponse,
  IPaymentHistoryEntity,
} from 'multirpc-sdk';
import { useEffect } from 'react';

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

  useEffect(() => {
    if (hasPrivateAccess) {
      const borders = getTimeframeBorders(timeframe);

      fetchExpenseChartData({
        ...borders,
        time_group: AggregatedPaymentHistoryTimeGroup.DAY,
        types: ['TRANSACTION_TYPE_DEDUCTION'],
        group,
      });
    }
  }, [fetchExpenseChartData, hasPrivateAccess, timeframe, group]);

  const { transactions = [] } = data;

  return [transactions, isLoading];
};
