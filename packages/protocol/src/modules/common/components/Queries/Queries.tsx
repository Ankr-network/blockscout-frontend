import { BaseQueryFn, FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { ReactElement, ReactNode } from 'react';
import { SerializedError } from '@reduxjs/toolkit';
import { Spinner } from 'ui';
import { TypedUseQueryStateResult } from '@reduxjs/toolkit/dist/query/react';

import { QueryEmpty } from '../QueryEmpty/QueryEmpty';
import { QueryError } from '../QueryError/QueryError';

type QueryState<Result> = TypedUseQueryStateResult<Result, any, BaseQueryFn>;
type QueryStates<R1, R2, R3, R4, R5> = R1 extends void
  ? []
  : [
      QueryState<R1>,
      ...(R2 extends void
        ? []
        : [
            QueryState<R2>,
            ...(R3 extends void
              ? []
              : [
                  QueryState<R3>,
                  ...(R4 extends void
                    ? []
                    : [
                        QueryState<R4>,
                        ...(R5 extends void ? [] : [QueryState<R5>]),
                      ]),
                ]),
          ]),
    ];

interface QueriesProps<R1, R2, R3, R4, R5> {
  children: (...args: QueryStates<R1, R2, R3, R4, R5>) => ReactNode;
  disableEmptyRender?: boolean;
  disableErrorRender?: boolean;
  empty?: JSX.Element;
  isPreloadDisabled?: boolean;
  noDataMessage?: ReactElement;
  queryStates: QueryStates<R1, R2, R3, R4, R5>;
  showLoaderDuringRefetch?: boolean;
  spinner?: ReactElement;
}

function isLoading<R1, R2, R3, R4, R5>(
  queriesStates: QueryStates<R1, R2, R3, R4, R5>,
) {
  return queriesStates.some(
    item => item && (item.isLoading || item.isUninitialized),
  );
}

function hasError<R1, R2, R3, R4, R5>(
  queriesStates: QueryStates<R1, R2, R3, R4, R5>,
) {
  const erroredState = queriesStates.find(item => item && item.error);

  return erroredState
    ? (erroredState.error as FetchBaseQueryError | SerializedError)
    : undefined;
}

function isStateEmpty({ data, isUninitialized }: QueryState<unknown>) {
  return isUninitialized || (data instanceof Array && data.length === 0);
}

function isEmpty<R1, R2, R3, R4, R5>(
  queriesStates: QueryStates<R1, R2, R3, R4, R5>,
) {
  return queriesStates.every(state => state && isStateEmpty(state));
}

export function Queries<R1 = void, R2 = void, R3 = void, R4 = void, R5 = void>({
  children,
  disableEmptyRender = false,
  disableErrorRender = false,
  empty,
  isPreloadDisabled = false,
  noDataMessage,
  queryStates = [] as QueryStates<R1, R2, R3, R4, R5>,
  showLoaderDuringRefetch = true,
  spinner = <Spinner />,
}: QueriesProps<R1, R2, R3, R4, R5>) {
  if (
    isLoading<R1, R2, R3, R4, R5>(queryStates) &&
    !isPreloadDisabled &&
    !(!showLoaderDuringRefetch && !isEmpty(queryStates))
  ) {
    return noDataMessage || spinner;
  }

  const error = hasError<R1, R2, R3, R4, R5>(queryStates);

  if (error) {
    if (!disableErrorRender) {
      return <QueryError error={error} />;
    }

    return <>{children(...queryStates)}</>;
  }

  if (isEmpty(queryStates) && !isPreloadDisabled) {
    if (!disableEmptyRender) {
      return empty || <QueryEmpty />;
    }

    return <>{children(...queryStates)}</>;
  }

  return <>{children(...queryStates)}</>;
}
