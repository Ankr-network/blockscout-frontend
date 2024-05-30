import { useCallback } from 'react';

import { IUseQueryProps } from 'store/queries/types';
import { getQueryParams } from 'store/utils/getQueryParams';
import { useAppSelector } from 'store/useAppSelector';

import {
  IFetchAllowanceUsdcParams,
  selectAllowanceUsdc,
  selectAllowanceUsdcLoading,
  useFetchAllowanceUsdcQuery,
  useLazyFetchAllowanceUsdcQuery,
} from '../actions/fetchAllowanceUsdc';

export interface IUseFetchAllowanceUsdcProps
  extends IUseQueryProps,
    IFetchAllowanceUsdcParams {}

export const useFetchAllowanceUsdc = ({
  skipFetching,
  ...params
}: IUseFetchAllowanceUsdcProps) => {
  const { refetch: handleRefetchAllowanceUsdc } = useFetchAllowanceUsdcQuery(
    getQueryParams({ params, skipFetching }),
  );

  const [fetchLazy] = useLazyFetchAllowanceUsdcQuery();

  const handleFetchAllowanceUsdc = useCallback(
    () => fetchLazy(params),
    [fetchLazy, params],
  );

  const usdcAllowance = useAppSelector(state =>
    selectAllowanceUsdc(state, params),
  );

  const isLoading = useAppSelector(state =>
    selectAllowanceUsdcLoading(state, params),
  );

  return {
    handleFetchAllowanceUsdc,
    handleRefetchAllowanceUsdc,
    isLoading,
    usdcAllowance,
  };
};
