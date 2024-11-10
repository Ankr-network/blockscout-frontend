import { useCallback, useMemo } from 'react';

import { IUseQueryProps } from 'store/queries/types';
import { getQueryParams } from 'store/utils/getQueryParams';
import { resetEndpoint } from 'store/utils/resetEndpoint';
import { useAppDispatch } from 'store/useAppDispatch';
import { useAppSelector } from 'store/useAppSelector';
import { useAutoupdatedRef } from 'modules/common/hooks/useAutoupdatedRef';

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
  address,
  network,
  skipFetching,
}: IUseFetchAllowanceUsdcProps) => {
  const params = useMemo(
    (): IFetchAllowanceUsdcParams => ({ address, network }),
    [address, network],
  );
  const { refetch: handleRefetchAllowanceUsdc } = useFetchAllowanceUsdcQuery(
    getQueryParams({ params, skipFetching }),
  );

  const [fetchLazy] = useLazyFetchAllowanceUsdcQuery();

  const handleFetchAllowanceUsdc = useCallback(
    () => fetchLazy(params),
    [fetchLazy, params],
  );

  const fetchAllowanceUsdcRef = useAutoupdatedRef(handleFetchAllowanceUsdc);

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
    fetchAllowanceUsdcRef,
    handleFetchAllowanceUsdc,
    handleRefetchAllowanceUsdc,
    isLoading,
    resetAlowanceFetchingUsdc,
  };
};
