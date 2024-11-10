import { useCallback, useMemo } from 'react';

import { IUseQueryProps } from 'store/queries/types';
import { getQueryParams } from 'store/utils/getQueryParams';
import { resetEndpoint } from 'store/utils/resetEndpoint';
import { useAppDispatch } from 'store/useAppDispatch';
import { useAppSelector } from 'store/useAppSelector';
import { useAutoupdatedRef } from 'modules/common/hooks/useAutoupdatedRef';

import {
  IFetchAllowanceUsdtParams,
  selectAllowanceUsdt,
  selectAllowanceUsdtLoading,
  selectAllowanceUsdtState,
  useFetchAllowanceUsdtQuery,
  useLazyFetchAllowanceUsdtQuery,
} from '../actions/fetchAllowanceUsdt';

export interface IUseFetchAllowanceUsdtProps
  extends IUseQueryProps,
    IFetchAllowanceUsdtParams {}

export const useFetchAllowanceUsdt = ({
  address,
  network,
  skipFetching,
}: IUseFetchAllowanceUsdtProps) => {
  const params = useMemo(
    (): IFetchAllowanceUsdtParams => ({ address, network }),
    [address, network],
  );

  const { refetch: handleRefetchAllowanceUsdt } = useFetchAllowanceUsdtQuery(
    getQueryParams({ params, skipFetching }),
  );

  const [fetchLazy] = useLazyFetchAllowanceUsdtQuery();

  const handleFetchAllowanceUsdt = useCallback(
    () => fetchLazy(params),
    [fetchLazy, params],
  );

  const fetchAllowanceUsdtRef = useAutoupdatedRef(handleFetchAllowanceUsdt);

  const { endpointName } = useAppSelector(state =>
    selectAllowanceUsdtState(state, params),
  );
  const allowanceUsdt = useAppSelector(state =>
    selectAllowanceUsdt(state, params),
  );
  const isLoading = useAppSelector(state =>
    selectAllowanceUsdtLoading(state, params),
  );

  const dispatch = useAppDispatch();
  const resetAlowanceFetchingUsdt = useCallback(
    () => resetEndpoint(endpointName, dispatch),
    [dispatch, endpointName],
  );

  return {
    allowanceUsdt,
    fetchAllowanceUsdtRef,
    handleFetchAllowanceUsdt,
    handleRefetchAllowanceUsdt,
    isLoading,
    resetAlowanceFetchingUsdt,
  };
};
