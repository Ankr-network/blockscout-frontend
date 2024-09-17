import { createSelector } from '@reduxjs/toolkit';

import { QueryEndpoint } from 'store/queries/types';
import { RootState } from 'store/store';

export interface ICreateQuerySelectorsParams<Params, Result> {
  endpoint: QueryEndpoint<Params, Result>;
  fallback?: Result;
}

export const createQuerySelectors = <Params, Result>({
  endpoint,
  fallback,
}: ICreateQuerySelectorsParams<Params, Result>) => {
  const selectStateCachedByParams = createSelector(
    (state: RootState, params: Params) => endpoint.select(params)(state),
    state => state,
  );

  const selectDataCachedByParams = createSelector(
    (state: RootState, params: Params) => endpoint.select(params)(state),
    ({ data }) => data,
  );

  const selectDataWithFallbackCachedByParams = createSelector(
    (state: RootState, params: Params) => endpoint.select(params)(state),
    ({ data }) => (data || fallback) as Result,
  );

  const selectLoadingCachedByParams = createSelector(
    (state: RootState, params: Params) => endpoint.select(params)(state),
    ({ isLoading }) => isLoading,
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
