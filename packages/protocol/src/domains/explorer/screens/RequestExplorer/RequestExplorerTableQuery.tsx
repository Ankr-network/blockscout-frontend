import { useDispatchRequest } from '@redux-requests/react';
import {
  fetchRequests,
  fetchRequestsMore,
} from 'domains/explorer/actions/fetchRequests';
import { ResponseData } from 'modules/api/utils/ResponseData';
import { Queries } from 'modules/common/components/Queries/Queries';
import { useOnMount } from 'modules/common/hooks/useOnMount';
import { useCallback } from 'react';
import { VirtualTableQuery } from 'ui';
import { RequestExplorerTable } from './components/RequestExplorerTable';

export const RequestExplorerTableQuery = () => {
  const dispatchRequest = useDispatchRequest();

  useOnMount(() => {
    dispatchRequest(fetchRequests({ cursor: 0, limit: 10 }));
  });

  const handleMoreRows = useCallback(
    async ({ page = 0 }: VirtualTableQuery) => {
      const cursor = page * 10 - 10;
      await dispatchRequest(fetchRequestsMore({ cursor, limit: 10 }));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  // const handleChangeSort = useCallback(
  //   async (params: { order: string; orderBy: string }) => {
  //     await dispatchRequest(fetchRequests({ cursor: 0, limit: 50 }));
  //   },
  //   [dispatchRequest],
  // );

  return (
    <Queries<ResponseData<typeof fetchRequests>>
      requestActions={[fetchRequests]}
    >
      {({ data, loading }) => {
        return (
          <RequestExplorerTable
            // onSort={handleChangeSort}
            onChangePage={handleMoreRows}
            data={data}
            isLoading={loading}
          />
        );
      }}
    </Queries>
  );
};
