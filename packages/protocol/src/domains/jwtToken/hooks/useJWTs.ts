import { useCallback, useMemo } from 'react';

import { IUseQueryProps } from 'store/queries/types';
import { getQueryParams } from 'store/utils/getQueryParams';
import { useAppSelector } from 'store/useAppSelector';

import {
  IFetchJWTsParams,
  selectJWTs,
  selectJWTsLoading,
  selectJWTsState,
  useFetchJWTsQuery,
  useLazyFetchJWTsQuery,
} from '../action/fetchJWTs';

export interface IUseJWTs extends IFetchJWTsParams, IUseQueryProps {}

export const useJWTs = ({ group, skipFetching }: IUseJWTs) => {
  const params = useMemo((): IFetchJWTsParams => ({ group }), [group]);

  const { isFetching } = useFetchJWTsQuery(
    getQueryParams({ params, skipFetching }),
  );

  const [fetchLazy] = useLazyFetchJWTsQuery();

  const handleFetchJWTs = useCallback(
    () => fetchLazy(params),
    [fetchLazy, params],
  );

  const jwts = useAppSelector(state => selectJWTs(state, params));
  const isLoading = useAppSelector(state => selectJWTsLoading(state, params));
  const jwtsState = useAppSelector(state => selectJWTsState(state, params));

  return { handleFetchJWTs, isFetching, isLoading, jwts, jwtsState };
};
