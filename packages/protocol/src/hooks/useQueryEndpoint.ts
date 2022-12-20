import { BaseQueryFn } from '@reduxjs/toolkit/dist/query';
import {
  QueryActionCreatorResult,
  StartQueryActionCreatorOptions,
} from '@reduxjs/toolkit/dist/query/core/buildInitiate';
import { TypedUseQueryStateResult } from '@reduxjs/toolkit/dist/query/react';
import { useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';

import { Definition, QueryEndpoint } from 'store/queries/types';
import { resetEndpoint } from 'store/utils/resetEndpoint';
import { useAppDispatch } from 'store/useAppDispatch';

export type Options = StartQueryActionCreatorOptions;

export type QueryResult<Params, Result> = TypedUseQueryStateResult<
  Result,
  Params,
  BaseQueryFn
>;

export type Trigger<Params, Result> = (
  params: Params,
) => QueryActionCreatorResult<Definition<Params, Result>>;

export const useQueryEndpoint = <Params, Result>(
  endpoint: QueryEndpoint<Params, Result>,
  options?: Options,
): [Trigger<Params, Result>, QueryResult<Params, Result>, () => void] => {
  const dispatch = useAppDispatch();
  const selector = useMemo(
    // Every endpoint doesn't use its params as cache key,
    // so we can select state without them
    () => endpoint.select(undefined as unknown as Params),
    [endpoint],
  );

  const result = useSelector(selector) as QueryResult<Params, Result>;
  const { endpointName = '' } = result;

  const trigger: Trigger<Params, Result> = useCallback(
    params => dispatch(endpoint.initiate(params, options)),
    [dispatch, endpoint, options],
  );

  const reset = useCallback(() => {
    resetEndpoint(endpointName, dispatch);
  }, [dispatch, endpointName]);

  return [trigger, result, reset];
};
