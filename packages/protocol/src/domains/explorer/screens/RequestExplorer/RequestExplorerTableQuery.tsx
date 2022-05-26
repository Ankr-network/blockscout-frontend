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
import { REQUEST_EXPLORER_TABLE_PAGE_SIZE } from './components/RequestExplorerTable/RequestExplorerTableUtils';

export const RequestExplorerTableQuery = () => {
  const dispatchRequest = useDispatchRequest();

  useOnMount(() => {
    dispatchRequest(
      fetchRequests({ cursor: 0, limit: REQUEST_EXPLORER_TABLE_PAGE_SIZE }),
    );
  });

  const handleMoreRows = useCallback(
    async ({ page = 0 }: VirtualTableQuery) => {
      const cursor =
        page * REQUEST_EXPLORER_TABLE_PAGE_SIZE -
        REQUEST_EXPLORER_TABLE_PAGE_SIZE;
      await dispatchRequest(
        fetchRequestsMore({ cursor, limit: REQUEST_EXPLORER_TABLE_PAGE_SIZE }),
      );
    },
    [dispatchRequest],
  );

  return (
    <Queries<ResponseData<typeof fetchRequests>>
      requestActions={[fetchRequests]}
    >
      {({ data }) => {
        return (
          <RequestExplorerTable
            // onSort={handleChangeSort}
            onChangePage={handleMoreRows}
            data={data}
          />
        );
      }}
    </Queries>
  );
};
