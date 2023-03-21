import { Web3Address } from 'multirpc-sdk';
import { useLazyFetchUserTransactionsQuery } from 'modules/clients/actions/fetchUserTransactions';
import { useCallback, useEffect } from 'react';

export const useTransactions = ({ address }: { address: Web3Address }) => {
  const [
    fetchTransactions,
    {
      data: transactionsData,
      isLoading: isLoadingTransactions,
      isFetching: isFetchingTransactions,
    },
  ] = useLazyFetchUserTransactionsQuery();

  useEffect(() => {
    fetchTransactions({ address });
  }, [address, fetchTransactions]);

  const loadMore = useCallback(
    () => fetchTransactions({ address, cursor: transactionsData?.cursor }),
    [address, fetchTransactions, transactionsData?.cursor],
  );

  return {
    loadMore,
    isLoadingTransactions,
    isFetchingTransactions,
    transactionsData,
  };
};
