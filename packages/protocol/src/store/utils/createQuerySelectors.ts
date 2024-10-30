import { createSelector } from '@reduxjs/toolkit';

import { QueryEndpoint } from 'store/queries/types';
import { RootState } from 'store/store';
import { deepEqulityCheck } from 'modules/common/utils/deepEqualityCheck';

export interface ICreateQuerySelectorsParams<Params, Result> {
  endpoint: QueryEndpoint<Params, Result>;
  fallback?: Result;
}

const selectorOptions = {
  memoizeOptions: {
    equalityCheck: deepEqulityCheck,
    resultEqualityCheck: deepEqulityCheck,
  },
};

export const createQuerySelectors = <Params, Result>({
  endpoint,
  fallback,
}: ICreateQuerySelectorsParams<Params, Result>) => {
  const selectStateCachedByParams = createSelector(
    (state: RootState, params: Params) => endpoint.select(params)(state),
    state => state,
    selectorOptions,
  );

  const selectDataCachedByParams = createSelector(
    (state: RootState, params: Params) => endpoint.select(params)(state),
    ({ data }) => data,
    selectorOptions,
  );

  const selectDataWithFallbackCachedByParams = createSelector(
    (state: RootState, params: Params) => endpoint.select(params)(state),
    ({ data }) => (data || fallback) as Result,
    selectorOptions,
  );

  const selectLoadingCachedByParams = createSelector(
    (state: RootState, params: Params) => endpoint.select(params)(state),
    ({ isLoading }) => isLoading,
    selectorOptions,
  );

  const selectState = endpoint.select(undefined as never);

  const selectData = createSelector(
    selectState,
    ({ data }) => data,
    selectorOptions,
  );

  const selectDataWithFallback = createSelector(
    selectData,
    data => (data || fallback) as Result,
    selectorOptions,
  );

  const selectLoading = createSelector(
    selectState,
    ({ isLoading }) => isLoading,
    selectorOptions,
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
