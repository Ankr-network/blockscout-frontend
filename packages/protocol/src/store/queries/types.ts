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

export type Definition<Args, Result> = QueryDefinition<
  Args,
  BaseQueryFn,
  string,
  Result
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
) => Promise<QueryReturnValue<ResultType, BaseQueryError<BaseQueryFn>>>;
