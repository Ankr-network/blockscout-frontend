import { useCallback, useEffect, useRef } from 'react';

import { useLazyFetchPaymentHistoryQuery } from 'domains/account/actions/fetchPaymentHistory';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';

import { PaymentHistory, PaymentHistoryParams } from '../types';
import { getTransactionsRequest } from '../utils/getTransactionsRequest';

const defaultData = {
  deductionsCursor: 0,
  transactionsCursor: 0,
  myBundlesPaymentsCursor: 0,
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
        myBundlesPaymentsCursor,
        transactionsCursor,
      } = defaultData,
      isLoading,
    },
  ] = useLazyFetchPaymentHistoryQuery();

  const { selectedGroupAddress: group } = useSelectedUserGroup();

  const groupRef = useRef(group);
  const timeframeRef = useRef(timeframe);
  const paymentTypeRef = useRef(paymentType);

  const hasMore =
    deductionsCursor > 0 ||
    transactionsCursor > 0 ||
    myBundlesPaymentsCursor > 0;

  const loadMore = useCallback(() => {
    if (hasMore) {
      fetchTransactions({
        ...getTransactionsRequest({
          deductionsCursor,
          paymentType,
          timeframe,
          transactionsCursor,
          myBundlesPaymentsCursor,
        }),
        isPaginationRequest: true,
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
    myBundlesPaymentsCursor,
  ]);

  useEffect(() => {
    const isGroupChanged = groupRef.current !== group;
    const isTimeframeChanged = timeframeRef.current !== timeframe;
    const isPaymentTypeChanged = paymentTypeRef.current !== paymentType;
    const requestParams = {
      group,
      ...getTransactionsRequest({ paymentType, timeframe }),
    };
    const request = fetchTransactions(requestParams);

    if (isGroupChanged || isTimeframeChanged || isPaymentTypeChanged) {
      request.abort();
      groupRef.current = group;
      timeframeRef.current = timeframe;
      paymentTypeRef.current = paymentType;

      // We need this timeout in order to refetch new data
      // after the first request is aborted in case of changing group, timeframe or payment type
      setTimeout(request.refetch, 0);
    }

    return request.abort;
  }, [fetchTransactions, paymentType, timeframe, group]);

  const initializing = isLoading && transactions.length === 0;

  return {
    hasMore,
    initializing,
    isLoading: !initializing && isLoading,
    loadMore,
    transactions,
  };
};
