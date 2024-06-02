import { useCallback } from 'react';

import { IUseQueryProps } from 'store/queries/types';
import { getQueryParams } from 'store/utils/getQueryParams';
import { useAppSelector } from 'store/useAppSelector';

import {
  IFetchWalletBalanceUsdtParams,
  selectWalletBalanceUsdt,
  selectWalletBalanceUsdtLoading,
  useFetchWalletBalanceUsdtQuery,
  useLazyFetchWalletBalanceUsdtQuery,
} from '../actions/fetchWalletBalanceUsdt';

export interface IUseWalletBalanceUsdtProps
  extends IUseQueryProps,
    IFetchWalletBalanceUsdtParams {}

export const useWalletBalanceUsdt = ({
  skipFetching,
  ...params
}: IUseWalletBalanceUsdtProps) => {
  const { refetch: handleRefetchWalletBalanceUsdt } =
    useFetchWalletBalanceUsdtQuery(getQueryParams({ params, skipFetching }));

  const [fetchLazy] = useLazyFetchWalletBalanceUsdtQuery();

  const handleFetchWalletBalanceUsdt = useCallback(
    () => fetchLazy(params),
    [fetchLazy, params],
  );

  const balanceUsdt = useAppSelector(state =>
    selectWalletBalanceUsdt(state, params),
  );

  const isLoading = useAppSelector(state =>
    selectWalletBalanceUsdtLoading(state, params),
  );

  return {
    balanceUsdt,
    handleFetchWalletBalanceUsdt,
    handleRefetchWalletBalanceUsdt,
    isLoading,
  };
};
