import { getQuery, QueryState, RequestAction } from '@redux-requests/core';
import { ReactElement, ReactNode } from 'react';
import { useAppSelector } from 'store/useAppSelector';
import { Spinner } from 'ui';
import { QueryEmpty } from '../QueryEmpty/QueryEmpty';
import { QueryError } from '../QueryError/QueryError';

interface ILoadingProps<T1, T2, T3, T4, T5> {
  requestActions: ((...args: any[]) => RequestAction)[];
  requestKeys?: string[];
  children: (
    ...a: [
      T1 extends void ? void : QueryState<T1>,
      T2 extends void ? void : QueryState<T2>,
      T3 extends void ? void : QueryState<T3>,
      T4 extends void ? void : QueryState<T4>,
      T5 extends void ? void : QueryState<T5>,
    ]
  ) => ReactNode;
  noDataMessage?: ReactElement;
  empty?: JSX.Element;
  spinner?: ReactElement;
  isPreloadDisabled?: boolean;
  showLoaderDuringRefetch?: boolean;
  disableErrorRender?: boolean;
  disableEmptyRender?: boolean;
}

function isLoading(queries: QueryState<any>[]) {
  return queries.find(item => item.loading || item.pristine);
}

function hasError(queries: QueryState<any>[]) {
  return queries.find(item => item.error);
}

function isDataEmpty(data: any) {
  if (!data && typeof data !== 'number') {
    return true;
  }

  return data instanceof Array && data.length === 0;
}

function isEmpty(queries: QueryState<any>[]) {
  return queries.every(item => isDataEmpty(item.data));
}

export function Queries<T1 = void, T2 = void, T3 = void, T4 = void, T5 = void>({
  requestActions,
  children,
  requestKeys,
  noDataMessage,
  empty,
  spinner = <Spinner />,
  isPreloadDisabled = false,
  showLoaderDuringRefetch = true,
  disableErrorRender = false,
  disableEmptyRender = false,
}: ILoadingProps<T1, T2, T3, T4, T5>) {
  const queries = useAppSelector(state =>
    requestActions.map((item, index) =>
      getQuery(state, {
        type: item.toString(),
        action: item,
        requestKey: requestKeys?.[index],
      }),
    ),
  );

  if (
    isLoading(queries) &&
    !isPreloadDisabled &&
    !(!showLoaderDuringRefetch && !isEmpty(queries))
  ) {
    return noDataMessage || spinner;
  }

  const error = hasError(queries);

  if (error) {
    if (!disableErrorRender) {
      return <QueryError error={error} />;
    }

    return <>{(children as any)(...queries)}</>;
  }

  if (isEmpty(queries) && !isPreloadDisabled) {
    if (!disableEmptyRender) {
      return empty || <QueryEmpty />;
    }

    return <>{(children as any)(...queries)}</>;
  }

  return <>{(children as any)(...queries)}</>;
}
