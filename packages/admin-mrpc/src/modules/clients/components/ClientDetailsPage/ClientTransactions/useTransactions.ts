import { TPaymentHistoryEntityType, Web3Address } from 'multirpc-sdk';
import { useCallback, useEffect, useState } from 'react';

import { useLazyFetchUserTransactionsQuery } from 'modules/clients/actions/fetchUserTransactions';

interface IUseTransactionsParams {
  address: Web3Address;
  types?: TPaymentHistoryEntityType[];
}

export const useTransactions = ({ address, types }: IUseTransactionsParams) => {
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
  }, [address, types, setIsFirstLoading]);

  useEffect(() => {
    fetchTransactions({ address, types }).then(() => setIsFirstLoading(false));
  }, [address, types, fetchTransactions]);

  const loadMore = useCallback(
    () =>
      fetchTransactions({ address, types, cursor: transactionsData?.cursor }),
    [address, types, fetchTransactions, transactionsData?.cursor],
  );

  return {
    loadMore,
    isLoadingTransactions: isLoadingTransactions || isFirstLoading,
    isFetchingTransactions,
    transactionsData,
  };
};
