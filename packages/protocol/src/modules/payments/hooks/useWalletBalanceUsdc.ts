import { useCallback, useMemo } from 'react';

import { IUseQueryProps } from 'store/queries/types';
import { getQueryParams } from 'store/utils/getQueryParams';
import { useAppSelector } from 'store/useAppSelector';
import { useAutoupdatedRef } from 'modules/common/hooks/useAutoupdatedRef';

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
  address,
  network,
  skipFetching,
}: IUseWalletBalanceUsdcProps) => {
  const params = useMemo(
    (): IFetchWalletBalanceUsdcParams => ({ address, network }),
    [address, network],
  );
  const { refetch: handleRefetchWalletBalanceUsdc } =
    useFetchWalletBalanceUsdcQuery(getQueryParams({ params, skipFetching }));

  const [fetchLazy] = useLazyFetchWalletBalanceUsdcQuery();

  const handleFetchWalletBalanceUsdc = useCallback(
    () => fetchLazy(params),
    [fetchLazy, params],
  );

  const fetchWalletBalanceUsdcRef = useAutoupdatedRef(
    handleFetchWalletBalanceUsdc,
  );

  const balanceUsdc = useAppSelector(state =>
    selectWalletBalanceUsdc(state, params),
  );

  const isLoading = useAppSelector(state =>
    selectWalletBalanceUsdcLoading(state, params),
  );

  return {
    balanceUsdc,
    fetchWalletBalanceUsdcRef,
    handleFetchWalletBalanceUsdc,
    handleRefetchWalletBalanceUsdc,
    isLoading,
  };
};
