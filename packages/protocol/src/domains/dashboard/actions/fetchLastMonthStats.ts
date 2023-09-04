import { PrivateStats, PrivateStatsInterval } from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { web3Api } from 'store/queries';
import { FetchPrivateStatsParams } from 'domains/chains/actions/private/fetchPrivateStats';

export type FetchLastMonthStatsParams = Pick<
  FetchPrivateStatsParams,
  'group' | 'userEndpointToken'
>;

const interval = PrivateStatsInterval.MONTH;

export const {
  endpoints: { fetchLastMonthStats },
  useLazyFetchLastMonthStatsQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchLastMonthStats: build.query<PrivateStats, FetchLastMonthStatsParams>({
      queryFn: createNotifyingQueryFn(async ({ group, userEndpointToken }) => {
        const api = MultiService.getService().getAccountingGateway();

        const promise = userEndpointToken
          ? api.getPrivateStatsByPremiumId(interval, userEndpointToken, group)
          : api.getPrivateStats(interval, group);

        const data = await promise;

        return { data };
      }),
    }),
  }),
  overrideExisting: true,
});
