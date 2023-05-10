import { useCallback, useEffect } from 'react';

import { PaymentHistory, PaymentHistoryParams } from '../types';
import { accountFetchPaymentHistory } from 'domains/account/actions/fetchTransactions';
import { getTransactionsRequest } from '../utils/getTransactionsRequest';
import { useQueryEndpoint } from 'hooks/useQueryEndpoint';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';

const defaultData = {
  deductionsCursor: 0,
  transactionsCursor: 0,
  list: [],
};

export const useTransactions = ({
  paymentType,
  timeframe,
}: PaymentHistoryParams): PaymentHistory => {
  const [
    fetchTransactions,
    {
      data: {
        deductionsCursor,
        list: transactions,
        transactionsCursor,
      } = defaultData,
      isLoading,
    },
    reset,
  ] = useQueryEndpoint(accountFetchPaymentHistory);

  const { selectedGroupAddress: group } = useSelectedUserGroup();

  const hasMore = deductionsCursor > 0 || transactionsCursor > 0;

  const loadMore = useCallback(() => {
    if (hasMore) {
      fetchTransactions({
        ...getTransactionsRequest({
          deductionsCursor,
          paymentType,
          timeframe,
          transactionsCursor,
        }),
        group,
      });
    }
  }, [
    fetchTransactions,
    deductionsCursor,
    hasMore,
    paymentType,
    timeframe,
    transactionsCursor,
    group,
  ]);

  useEffect(() => {
    fetchTransactions({
      ...getTransactionsRequest({ paymentType, timeframe }),
      group,
    });

    return reset;
  }, [fetchTransactions, paymentType, reset, timeframe, group]);

  const initializing = isLoading && transactions.length === 0;

  return {
    hasMore,
    initializing,
    isLoading: !initializing && isLoading,
    loadMore,
    transactions,
  };
};
