import { PrivateStats, PrivateStatsInterval } from 'multirpc-sdk';

import { getAccountingGateway } from 'modules/api/MultiService';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { web3Api } from 'store/queries';

import { FetchChainsStatsParams } from './types';

export const {
  endpoints: { fetchChainsStatsForLast1h },
  useFetchChainsStatsForLast1hQuery,
  useLazyFetchChainsStatsForLast1hQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchChainsStatsForLast1h: build.query<
      PrivateStats,
      FetchChainsStatsParams
    >({
      queryFn: createNotifyingQueryFn(
        async ({ gateway = getAccountingGateway(), group }) => {
          const data = await gateway.getPrivateStats(
            PrivateStatsInterval.HOUR,
            group,
          );

          return { data };
        },
      ),
    }),
  }),
});
