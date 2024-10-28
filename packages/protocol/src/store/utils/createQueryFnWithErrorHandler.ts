import { QueryFn, QueryReturn } from 'store/queries/types';

type ErrorHandler<Params, Result> = (
  error: unknown,
  ...args: Parameters<QueryFn<Params, Result>>
) => QueryReturn<Result>;

export interface QueryFnWithErrorHandlerParams<Params, Result> {
  errorHandler?: ErrorHandler<Params, Result>;
  queryFn: QueryFn<Params, Result>;
}

export const createQueryFnWithErrorHandler = <Params, Result>({
  errorHandler = error => ({ error }),
  queryFn,
}: QueryFnWithErrorHandlerParams<Params, Result>): QueryFn<Params, Result> => {
  const fn: QueryFn<Params, Result> = async (...args) => {
    try {
      const result = await queryFn(...args);

      return result;
    } catch (error) {
      return errorHandler(error, ...args);
    }
  };

  return fn;
};
