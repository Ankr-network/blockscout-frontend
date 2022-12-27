import { BaseQueryFn } from '@reduxjs/toolkit/dist/query';

import { QueryFn } from 'store/queries/types';
import { createNotifyingQueryFn } from './createNotifyingQueryFn';

export interface ConditionallyNotifyingQueryFnParams<Params> {
  params: Params;
  shouldNotify?: boolean;
}

type ConditionallyNotifyingQueryFn<Params, Result> = QueryFn<
  ConditionallyNotifyingQueryFnParams<Params>,
  Result
>;

export const createConditionallyNotifyingQueryFn = <Params, Result>(
  queryFn: QueryFn<Params, Result>,
): ConditionallyNotifyingQueryFn<Params, Result> => {
  const fn: ConditionallyNotifyingQueryFn<Params, Result> = async (
    { params, shouldNotify } = {
      params: undefined as Params,
      shouldNotify: true,
    },
    ...args
  ) => {
    if (shouldNotify) {
      const result = await createNotifyingQueryFn<Params, BaseQueryFn, Result>(
        queryFn,
      )(params, ...args);

      return result;
    }

    try {
      const result = await queryFn(params, ...args);

      return result;
    } catch (error) {
      return { error };
    }
  };

  return fn;
};
