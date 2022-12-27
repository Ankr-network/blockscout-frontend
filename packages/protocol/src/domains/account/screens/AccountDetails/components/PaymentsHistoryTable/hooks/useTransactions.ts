import { useCallback, useEffect } from 'react';

import { PaymentHistory, PaymentHistoryParams } from '../types';
import { accountFetchPaymentHistory } from 'domains/account/actions/fetchTransactions';
import { getTransactionsRequest } from '../utils/getTransactionsRequest';
import { useQueryEndpoint } from 'hooks/useQueryEndpoint';

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

  const hasMore = deductionsCursor > 0 || transactionsCursor > 0;

  const loadMore = useCallback(() => {
    if (hasMore) {
      fetchTransactions(
        getTransactionsRequest({
          deductionsCursor,
          paymentType,
          timeframe,
          transactionsCursor,
        }),
      );
    }
  }, [
    fetchTransactions,
    deductionsCursor,
    hasMore,
    paymentType,
    timeframe,
    transactionsCursor,
  ]);

  useEffect(() => {
    fetchTransactions(getTransactionsRequest({ paymentType, timeframe }));

    return reset;
  }, [fetchTransactions, paymentType, reset, timeframe]);

  const initializing = isLoading && transactions.length === 0;

  return {
    hasMore,
    initializing,
    isLoading: !initializing && isLoading,
    loadMore,
    transactions,
  };
};
