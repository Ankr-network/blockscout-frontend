import { useCallback } from 'react';

import { IUseQueryProps } from 'store/queries/types';
import { getQueryParams } from 'store/utils/getQueryParams';
import { useAppSelector } from 'store/useAppSelector';

import {
  IFetchWalletBalanceUsdcParams,
  selectWalletBalanceUsdc,
  selectWalletBalanceUsdcLoading,
  useFetchWalletBalanceUsdcQuery,
  useLazyFetchWalletBalanceUsdcQuery,
} from '../actions/fetchWalletBalanceUsdc';

export interface IUseWalletBalanceUsdcProps
  extends IUseQueryProps,
    IFetchWalletBalanceUsdcParams {}

export const useWalletBalanceUsdc = ({
  skipFetching,
  ...params
}: IUseWalletBalanceUsdcProps) => {
  const { refetch: handleRefetchWalletBalanceUsdc } =
    useFetchWalletBalanceUsdcQuery(getQueryParams({ params, skipFetching }));

  const [fetchLazy] = useLazyFetchWalletBalanceUsdcQuery();

  const handleFetchWalletBalanceUsdc = useCallback(
    () => fetchLazy(params),
    [fetchLazy, params],
  );

  const balanceUsdc = useAppSelector(state =>
    selectWalletBalanceUsdc(state, params),
  );

  const isLoading = useAppSelector(state =>
    selectWalletBalanceUsdcLoading(state, params),
  );

  return {
    balanceUsdc,
    handleFetchWalletBalanceUsdc,
    handleRefetchWalletBalanceUsdc,
    isLoading,
  };
};
