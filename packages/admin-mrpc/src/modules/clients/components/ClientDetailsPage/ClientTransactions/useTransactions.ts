import { TPaymentHistoryEntityType, Web3Address } from 'multirpc-sdk';
import { useCallback } from 'react';

import { useLazyFetchUserTransactionsQuery } from 'modules/clients/actions/fetchUserTransactions';

interface IUseTransactionsParams {
  address: Web3Address;
  types?: TPaymentHistoryEntityType[];
}

export const useTransactions = ({ address, types }: IUseTransactionsParams) => {
  const [
    fetchTransactions,
    {
      data: transactionsData,
      isLoading: isLoadingTransactions,
      isFetching: isFetchingTransactions,
      isUninitialized,
    },
  ] = useLazyFetchUserTransactionsQuery();

  const loadMore = useCallback(
    () =>
      fetchTransactions({ address, types, cursor: transactionsData?.cursor }),
    [address, types, fetchTransactions, transactionsData?.cursor],
  );

  return {
    loadMore,
    isLoadingTransactions,
    isFetchingTransactions,
    isUninitialized,
    transactionsData,
  };
};
