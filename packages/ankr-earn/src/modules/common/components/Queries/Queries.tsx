import { Box } from '@material-ui/core';
import { getQuery, QueryState, RequestAction } from '@redux-requests/core';
import { ReactElement, ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { QueryLoading } from 'uiKit/QueryLoading';
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
  showLoaderDuringRefetch?: boolean;
  suppressErrorMessage?: boolean;
}

function isLoading(queries: QueryState<any>[]) {
  return queries.find(item => item.loading || item.pristine);
}

function hasError(queries: QueryState<any>[]) {
  return queries.find(item => item.error);
}

function isDataEmpty(data: any) {
  if (!data) {
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
  showLoaderDuringRefetch = true,
  suppressErrorMessage = false,
}: ILoadingProps<T1, T2, T3, T4, T5>) {
  const queries = useSelector(state =>
    requestActions.map((item, index) =>
      getQuery(state, {
        type: item.toString(),
        action: item,
        requestKey: requestKeys?.[index],
      }),
    ),
  );

  if (isLoading(queries) && !(!showLoaderDuringRefetch && !isEmpty(queries))) {
    return (
      noDataMessage || (
        <Box
          py={5}
          position="relative"
          width="100%"
          display="flex"
          justifyContent="center"
        >
          <QueryLoading />
        </Box>
      )
    );
  }

  const error = hasError(queries);

  if (error && suppressErrorMessage) {
    return null;
  }

  if (error) {
    return <QueryError error={error} />;
  }

  if (isEmpty(queries)) {
    return <QueryEmpty />;
  }

  return <>{(children as any)(...queries)}</>;
}
