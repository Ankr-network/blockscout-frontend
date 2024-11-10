import { useCallback, useMemo } from 'react';

import { IUseQueryProps } from 'store/queries/types';
import { getQueryParams } from 'store/utils/getQueryParams';
import { useAppSelector } from 'store/useAppSelector';
import { useAutoupdatedRef } from 'modules/common/hooks/useAutoupdatedRef';

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
  address,
  network,
  skipFetching,
}: IUseWalletBalanceUsdtProps) => {
  const params = useMemo(
    (): IFetchWalletBalanceUsdtParams => ({ address, network }),
    [address, network],
  );
  const { refetch: handleRefetchWalletBalanceUsdt } =
    useFetchWalletBalanceUsdtQuery(getQueryParams({ params, skipFetching }));

  const [fetchLazy] = useLazyFetchWalletBalanceUsdtQuery();

  const handleFetchWalletBalanceUsdt = useCallback(
    () => fetchLazy(params),
    [fetchLazy, params],
  );

  const fetchWalletBalanceUsdtRef = useAutoupdatedRef(
    handleFetchWalletBalanceUsdt,
  );

  const balanceUsdt = useAppSelector(state =>
    selectWalletBalanceUsdt(state, params),
  );

  const isLoading = useAppSelector(state =>
    selectWalletBalanceUsdtLoading(state, params),
  );

  return {
    balanceUsdt,
    fetchWalletBalanceUsdtRef,
    handleFetchWalletBalanceUsdt,
    handleRefetchWalletBalanceUsdt,
    isLoading,
  };
};
