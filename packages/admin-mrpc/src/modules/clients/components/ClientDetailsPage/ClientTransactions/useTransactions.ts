import { Web3Address } from 'multirpc-sdk';
import { useLazyFetchUserTransactionsQuery } from 'modules/clients/actions/fetchUserTransactions';
import { useCallback, useEffect, useState } from 'react';

export const useTransactions = ({ address }: { address: Web3Address }) => {
  const [isFirstLoading, setIsFirstLoading] = useState(true);

  const [
    fetchTransactions,
    {
      data: transactionsData,
      isLoading: isLoadingTransactions,
      isFetching: isFetchingTransactions,
    },
  ] = useLazyFetchUserTransactionsQuery();

  useEffect(() => {
    setIsFirstLoading(true);
  }, [address, setIsFirstLoading]);

  useEffect(() => {
    fetchTransactions({ address }).then(() => setIsFirstLoading(false));
  }, [address, fetchTransactions]);

  const loadMore = useCallback(
    () => fetchTransactions({ address, cursor: transactionsData?.cursor }),
    [address, fetchTransactions, transactionsData?.cursor],
  );

  return {
    loadMore,
    isLoadingTransactions: isLoadingTransactions || isFirstLoading,
    isFetchingTransactions,
    transactionsData,
  };
};
