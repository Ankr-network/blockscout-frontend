import { useCallback, useMemo } from 'react';

import { IUseQueryProps } from 'store/queries/types';
import { getQueryParams } from 'store/utils/getQueryParams';
import { useAppSelector } from 'store/useAppSelector';
import { useAutoupdatedRef } from 'modules/common/hooks/useAutoupdatedRef';

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
  address,
  skipFetching,
}: IUseWalletBalanceAnkrProps) => {
  const params = useMemo(
    (): IFetchWalletBalanceAnkrParams => ({ address }),
    [address],
  );

  const { refetch: handleRefetchWalletBalanceAnkr } =
    useFetchWalletBalanceAnkrQuery(getQueryParams({ params, skipFetching }));

  const [fetchLazy] = useLazyFetchWalletBalanceAnkrQuery();

  const handleFetchWalletBalanceAnkr = useCallback(
    () => fetchLazy(params),
    [fetchLazy, params],
  );

  const fetchWalletBalanceAnkrRef = useAutoupdatedRef(
    handleFetchWalletBalanceAnkr,
  );

  const balanceAnkr = useAppSelector(state =>
    selectWalletBalanceAnkr(state, params),
  );
  const isLoading = useAppSelector(state =>
    selectWalletBalanceAnkrLoading(state, params),
  );

  return {
    balanceAnkr,
    fetchWalletBalanceAnkrRef,
    handleFetchWalletBalanceAnkr,
    handleRefetchWalletBalanceAnkr,
    isLoading,
  };
};
