import { createSelector, weakMapMemoize } from 'reselect';

import { QueryEndpoint } from 'store/queries/types';
import { RootState } from 'store/store';
import { deepEqulityCheck } from 'modules/common/utils/deepEqualityCheck';

export interface ICreateQuerySelectorsParams<Params, Result> {
  endpoint: QueryEndpoint<Params, Result>;
  fallback?: Result;
}

export const createQuerySelectors = <Params, Result>({
  endpoint,
  fallback,
}: ICreateQuerySelectorsParams<Params, Result>) => {
  const selectStateCachedByParams = createSelector(
    (state: RootState, params: Params) => ({ params, state }),
    ({ params, state }) => endpoint.select(params)(state),
    {
      memoize: weakMapMemoize,
      memoizeOptions: { resultEqualityCheck: deepEqulityCheck },
      argsMemoize: weakMapMemoize,
    },
  );

  const selectDataCachedByParams = createSelector(
    (state: RootState, params: Params) => endpoint.select(params)(state),
    ({ data }) => data,
    {
      memoize: weakMapMemoize,
      memoizeOptions: { resultEqualityCheck: deepEqulityCheck },
      argsMemoize: weakMapMemoize,
    },
  );

  const selectDataWithFallbackCachedByParams = createSelector(
    (state: RootState, params: Params) => endpoint.select(params)(state),
    ({ data }) => (data || fallback) as Result,
    {
      memoize: weakMapMemoize,
      memoizeOptions: { resultEqualityCheck: deepEqulityCheck },
      argsMemoize: weakMapMemoize,
    },
  );

  const selectLoadingCachedByParams = createSelector(
    (state: RootState, params: Params) => endpoint.select(params)(state),
    ({ isLoading }) => isLoading,
    {
      argsMemoize: weakMapMemoize,
      memoizeOptions: { resultEqualityCheck: deepEqulityCheck },
      memoize: weakMapMemoize,
    },
  );

  const selectState = endpoint.select(undefined as never);

  const selectData = createSelector(selectState, ({ data }) => data);

  const selectDataWithFallback = createSelector(
    selectData,
    data => (data || fallback) as Result,
  );

  const selectLoading = createSelector(
    selectState,
    ({ isLoading }) => isLoading,
  );

  return {
    selectData,
    selectDataCachedByParams,
    selectDataWithFallback,
    selectDataWithFallbackCachedByParams,
    selectLoading,
    selectLoadingCachedByParams,
    selectState,
    selectStateCachedByParams,
  };
};
