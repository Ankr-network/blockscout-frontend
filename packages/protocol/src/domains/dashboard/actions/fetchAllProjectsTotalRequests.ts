import { MultiService } from 'modules/api/MultiService';
import { ProjectsStatsParams } from '../types';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { web3Api } from 'store/queries';

export const {
  endpoints: { fetchAllProjectsTotalRequests },
  useFetchAllProjectsTotalRequestsQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchAllProjectsTotalRequests: build.query<number, ProjectsStatsParams>({
      queryFn: createNotifyingQueryFn(async ({ interval, group }) => {
        const api = MultiService.getService().getAccountGateway();

        const data = await api.getPrivateStats(interval, group);

        return { data: data?.total_requests ?? 0 };
      }),
    }),
  }),
  overrideExisting: true,
});
