import { useCallback, useMemo } from 'react';

import { IUseQueryProps } from 'store/queries/types';
import { getQueryParams } from 'store/utils/getQueryParams';
import { resetEndpoint } from 'store/utils/resetEndpoint';
import { useAppDispatch } from 'store/useAppDispatch';
import { useAppSelector } from 'store/useAppSelector';
import { useAutoupdatedRef } from 'modules/common/hooks/useAutoupdatedRef';

import {
  IFetchAllowanceAnkrParams,
  selectAllowanceAnkr,
  selectAllowanceAnkrLoading,
  selectAllowanceAnkrState,
  useFetchAllowanceAnkrQuery,
  useLazyFetchAllowanceAnkrQuery,
} from '../actions/fetchAllowanceAnkr';

export interface IUseFetchAllowanceAnkrProps
  extends IUseQueryProps,
    IFetchAllowanceAnkrParams {}

export const useFetchAllowanceAnkr = ({
  address,
  skipFetching,
}: IUseFetchAllowanceAnkrProps) => {
  const params = useMemo(
    (): IFetchAllowanceAnkrParams => ({ address }),
    [address],
  );
  const { refetch: handleRefetchAllowanceAnkr } = useFetchAllowanceAnkrQuery(
    getQueryParams({ params, skipFetching }),
  );

  const [fetchLazy] = useLazyFetchAllowanceAnkrQuery();

  const handleFetchAllowanceAnkr = useCallback(
    () => fetchLazy(params),
    [fetchLazy, params],
  );

  const fetchAllowanceAnkrRef = useAutoupdatedRef(handleFetchAllowanceAnkr);

  const { endpointName } = useAppSelector(state =>
    selectAllowanceAnkrState(state, params),
  );
  const allowanceAnkr = useAppSelector(state =>
    selectAllowanceAnkr(state, params),
  );
  const isLoading = useAppSelector(state =>
    selectAllowanceAnkrLoading(state, params),
  );

  const dispatch = useAppDispatch();
  const resetAlowanceFetchingAnkr = useCallback(
    () => resetEndpoint(endpointName, dispatch),
    [dispatch, endpointName],
  );

  return {
    allowanceAnkr,
    fetchAllowanceAnkrRef,
    handleFetchAllowanceAnkr,
    handleRefetchAllowanceAnkr,
    isLoading,
    resetAlowanceFetchingAnkr,
  };
};
