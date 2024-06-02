import { useCallback } from 'react';

import { IUseQueryProps } from 'store/queries/types';
import { getQueryParams } from 'store/utils/getQueryParams';
import { resetEndpoint } from 'store/utils/resetEndpoint';
import { useAppDispatch } from 'store/useAppDispatch';
import { useAppSelector } from 'store/useAppSelector';

import {
  IFetchAllowanceUsdcParams,
  selectAllowanceUsdc,
  selectAllowanceUsdcLoading,
  selectAllowanceUsdcState,
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

  const { endpointName } = useAppSelector(state =>
    selectAllowanceUsdcState(state, params),
  );
  const allowanceUsdc = useAppSelector(state =>
    selectAllowanceUsdc(state, params),
  );
  const isLoading = useAppSelector(state =>
    selectAllowanceUsdcLoading(state, params),
  );

  const dispatch = useAppDispatch();
  const resetAlowanceFetchingUsdc = useCallback(
    () => resetEndpoint(endpointName, dispatch),
    [dispatch, endpointName],
  );

  return {
    allowanceUsdc,
    handleFetchAllowanceUsdc,
    handleRefetchAllowanceUsdc,
    isLoading,
    resetAlowanceFetchingUsdc,
  };
};
