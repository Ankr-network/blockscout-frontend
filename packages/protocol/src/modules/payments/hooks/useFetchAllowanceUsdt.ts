import { useCallback } from 'react';

import { IUseQueryProps } from 'store/queries/types';
import { getQueryParams } from 'store/utils/getQueryParams';
import { useAppSelector } from 'store/useAppSelector';

import {
  IFetchAllowanceUsdtParams,
  selectAllowanceUsdt,
  selectAllowanceUsdtLoading,
  useFetchAllowanceUsdtQuery,
  useLazyFetchAllowanceUsdtQuery,
} from '../actions/fetchAllowanceUsdt';

export interface IUseFetchAllowanceUsdtProps
  extends IUseQueryProps,
    IFetchAllowanceUsdtParams {}

export const useFetchAllowanceUsdt = ({
  skipFetching,
  ...params
}: IUseFetchAllowanceUsdtProps) => {
  const { refetch: handleRefetchAllowanceUsdt } = useFetchAllowanceUsdtQuery(
    getQueryParams({ params, skipFetching }),
  );

  const [fetchLazy] = useLazyFetchAllowanceUsdtQuery();

  const handleFetchAllowanceUsdt = useCallback(
    () => fetchLazy(params),
    [fetchLazy, params],
  );

  const usdtAllowance = useAppSelector(state =>
    selectAllowanceUsdt(state, params),
  );

  const isLoading = useAppSelector(state =>
    selectAllowanceUsdtLoading(state, params),
  );

  return {
    handleFetchAllowanceUsdt,
    handleRefetchAllowanceUsdt,
    isLoading,
    usdtAllowance,
  };
};
