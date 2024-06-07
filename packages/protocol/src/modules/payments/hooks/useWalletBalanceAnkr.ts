import { useCallback } from 'react';

import { IUseQueryProps } from 'store/queries/types';
import { getQueryParams } from 'store/utils/getQueryParams';
import { useAppSelector } from 'store/useAppSelector';

import {
  IFetchWalletBalanceAnkrParams,
  selectWalletBalanceAnkr,
  selectWalletBalanceAnkrLoading,
  useFetchWalletBalanceAnkrQuery,
  useLazyFetchWalletBalanceAnkrQuery,
} from '../actions/fetchWalletBalanceAnkr';

export interface IUseWalletBalanceAnkrProps
  extends IUseQueryProps,
    IFetchWalletBalanceAnkrParams {}

export const useWalletBalanceAnkr = ({
  skipFetching,
  ...params
}: IUseWalletBalanceAnkrProps) => {
  const { refetch: handleRefetchWalletBalanceAnkr } =
    useFetchWalletBalanceAnkrQuery(getQueryParams({ params, skipFetching }));

  const [fetchLazy] = useLazyFetchWalletBalanceAnkrQuery();

  const handleFetchWalletBalanceAnkr = useCallback(
    () => fetchLazy(params),
    [fetchLazy, params],
  );

  const balanceAnkr = useAppSelector(state =>
    selectWalletBalanceAnkr(state, params),
  );
  const isLoading = useAppSelector(state =>
    selectWalletBalanceAnkrLoading(state, params),
  );

  return {
    balanceAnkr,
    handleFetchWalletBalanceAnkr,
    handleRefetchWalletBalanceAnkr,
    isLoading,
  };
};
