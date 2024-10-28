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

  useFetchJWTsQuery(getQueryParams({ params, skipFetching }));

  const [fetchLazy] = useLazyFetchJWTsQuery();

  const handleFetchJWTs = useCallback(
    () => fetchLazy(params),
    [fetchLazy, params],
  );

  const jwts = useAppSelector(state => selectJWTs(state, params));
  const loading = useAppSelector(state => selectJWTsLoading(state, params));
  const state = useAppSelector(storeState =>
    selectJWTsState(storeState, params),
  );

  return { handleFetchJWTs, loading, jwts, state };
};
