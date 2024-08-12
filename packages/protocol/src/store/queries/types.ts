import { ApiEndpointQuery } from '@reduxjs/toolkit/dist/query/core/module';
import {
  BaseQueryApi,
  BaseQueryError,
  BaseQueryExtraOptions,
  QueryReturnValue,
} from '@reduxjs/toolkit/dist/query/baseQueryTypes';
import {
  BaseQueryFn,
  EndpointDefinitions,
  QueryDefinition,
} from '@reduxjs/toolkit/dist/query';
import { PromiseWithKnownReason } from '@reduxjs/toolkit/dist/query/core/buildMiddleware/types';
import { QueryFulfilledRejectionReason } from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import { BaseQueryMeta } from '@reduxjs/toolkit/src/query/baseQueryTypes';

export type Definition<Args, Result> = QueryDefinition<
  Args,
  BaseQueryFn,
  string,
  Result,
  'api' | 'projectApi'
>;

export type QueryEndpoint<Params, Result> = ApiEndpointQuery<
  Definition<Params, Result>,
  EndpointDefinitions
>;

export type QueryFn<QueryArg, ResultType> = (
  arg: QueryArg,
  api: BaseQueryApi,
  extraOptions: BaseQueryExtraOptions<BaseQueryFn>,
  baseQuery: (arg: Parameters<BaseQueryFn>[0]) => ReturnType<BaseQueryFn>,
) => Promise<QueryReturn<ResultType>>;

export type QueryReturn<Result> = QueryReturnValue<
  Result,
  BaseQueryError<BaseQueryFn>
>;

export type TQueryFulfilled<Data> = PromiseWithKnownReason<
  { data: Data; meta: object | undefined },
  QueryFulfilledRejectionReason<BaseQueryFn>
>;

export type TwoFAQueryFnParams<Params> = Params extends void
  ? void | {
      params?: Params;
      totp?: string;
    }
  : {
      params: Params;
      totp?: string;
    };

export interface IUseQueryProps {
  skipFetching?: boolean;
  pollingInterval?: number;
}

export interface IHandledQueryError {
  error: BaseQueryError<BaseQueryFn>;
  isUnhandledError: false;
  meta: BaseQueryMeta<BaseQueryFn>;
}

export interface IUnhandledQueryError {
  error: unknown;
  meta?: undefined;
  isUnhandledError: true;
}
