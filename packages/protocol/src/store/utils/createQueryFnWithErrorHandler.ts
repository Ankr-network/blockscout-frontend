import { QueryFn, QueryReturn } from 'store/queries/types';

export interface QueryFnWithErrorHandlerParams<Params, Result> {
  errorHandler?: (error: unknown) => QueryReturn<Result>;
  queryFn: QueryFn<Params, Result>;
}

export const createQueryFnWithErrorHandler = <Params, Result>({
  errorHandler = () => ({ error: undefined }),
  queryFn,
}: QueryFnWithErrorHandlerParams<Params, Result>): QueryFn<Params, Result> => {
  const fn: QueryFn<Params, Result> = async (...args) => {
    try {
      const result = await queryFn(...args);

      return result;
    } catch (error) {
      return errorHandler(error);
    }
  };

  return fn;
};
