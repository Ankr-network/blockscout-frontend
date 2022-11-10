import {
  BaseQueryApi,
  BaseQueryError,
  BaseQueryExtraOptions,
  BaseQueryFn,
  QueryReturnValue,
} from '@reduxjs/toolkit/src/query/baseQueryTypes';
import { v4 as uuid } from 'uuid';

import { t } from 'common';

import { showNotification } from 'modules/notifications';

type TError =
  | Error
  | {
      message?: string;
    } /* | unknown */;

type TQueryFn<QueryArg, BaseQuery extends BaseQueryFn, ResultType> = {
  (
    arg: QueryArg,
    api: BaseQueryApi,
    extraOptions: BaseQueryExtraOptions<BaseQuery>,
    baseQuery: (arg: Parameters<BaseQuery>[0]) => ReturnType<BaseQuery>,
  ): Promise<QueryReturnValue<ResultType, BaseQueryError<BaseQuery>>>;
};

interface IOptions {
  showNotificationOnError?: boolean;
}

const getErrMsg = (error: TError): string => {
  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error?.message === 'string') {
    return error.message;
  }

  return t('error.unknown');
};

export const queryFnNotifyWrapper =
  <QueryArg, BaseQuery extends BaseQueryFn, ResultType>(
    queryFn: TQueryFn<QueryArg, BaseQuery, ResultType>,
    onErrFn?: <ErrResultType>(error: ErrResultType) => string,
    options: IOptions = {
      showNotificationOnError: true,
    },
  ) =>
  async (
    arg: QueryArg,
    api: BaseQueryApi,
    extraOptions: BaseQueryExtraOptions<BaseQuery>,
    baseQuery: (arg: Parameters<BaseQuery>[0]) => ReturnType<BaseQuery>,
  ): Promise<QueryReturnValue<ResultType, BaseQueryError<BaseQuery>>> => {
    try {
      return await queryFn(arg, api, extraOptions, baseQuery);
    } catch (error) {
      if (options.showNotificationOnError) {
        const errMsg =
          typeof onErrFn === 'function'
            ? onErrFn(error)
            : getErrMsg(error as TError);

        api.dispatch(
          showNotification({
            key: `${uuid()}_ERROR`,
            message: `Error: ${errMsg}`,
            variant: 'error',
          }),
        );
      }

      return {
        error,
      };
    }
  };
