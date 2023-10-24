import { getAccountingGateway } from 'modules/api/MultiService';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { web3Api } from 'store/queries';

import { ProjectsStatsParams } from '../types';

export const {
  endpoints: { fetchAllProjectsTotalRequests },
  useLazyFetchAllProjectsTotalRequestsQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchAllProjectsTotalRequests: build.query<number, ProjectsStatsParams>({
      queryFn: createNotifyingQueryFn(
        async ({ interval, group, gateway = getAccountingGateway() }) => {
          const data = await gateway.getPrivateStats(interval, group);

          return { data: data?.total_requests ?? 0 };
        },
      ),
    }),
  }),
  overrideExisting: true,
});
