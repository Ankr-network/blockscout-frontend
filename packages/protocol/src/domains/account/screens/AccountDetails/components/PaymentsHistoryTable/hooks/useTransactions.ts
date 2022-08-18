import { resetRequests } from '@redux-requests/core';
import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useDispatchRequest, useQuery } from '@redux-requests/react';

import { PaymentHistory, PaymentHistoryParams } from '../types';
import { fetchTransactions } from 'domains/account/actions/fetchTransactions';
import { getTransactionsRequest } from '../utils/getTransactionsRequest';

const defaultData = {
  list: [],
};

export const useTransactions = ({
  paymentType,
  timeframe,
}: PaymentHistoryParams): PaymentHistory => {
  const {
    data: { deductionsCursor, list: transactions, transactionsCursor },
    loading,
  } = useQuery({ defaultData, type: fetchTransactions });
  const hasMore = deductionsCursor >= 0 || transactionsCursor >= 0;

  const dispatchRequest = useDispatchRequest();
  const dispatch = useDispatch();

  const loadMore = useCallback(() => {
    if (hasMore) {
      dispatchRequest(
        fetchTransactions(
          getTransactionsRequest({
            deductionsCursor,
            paymentType,
            timeframe,
            transactionsCursor,
          }),
        ),
      );
    }
  }, [
    deductionsCursor,
    dispatchRequest,
    hasMore,
    paymentType,
    timeframe,
    transactionsCursor,
  ]);

  useEffect(() => {
    dispatchRequest(
      fetchTransactions(getTransactionsRequest({ paymentType, timeframe })),
    );

    return () => {
      dispatch(resetRequests([fetchTransactions.toString()]));
    };
  }, [dispatch, dispatchRequest, paymentType, timeframe]);

  return {
    hasMore,
    initializing: loading && transactions.length === 0,
    loading,
    loadMore,
    transactions,
  };
};
