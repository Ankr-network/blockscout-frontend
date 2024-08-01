import { PrivateStats, PrivateStatsInterval } from 'multirpc-sdk';

import { getAccountingGateway } from 'modules/api/MultiService';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { web3Api } from 'store/queries';

import { FetchChainsStatsParams } from './types';

export const {
  endpoints: { fetchChainStatsForLast24h },
  useFetchChainStatsForLast24hQuery,
  useLazyFetchChainStatsForLast24hQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchChainStatsForLast24h: build.query<
      PrivateStats,
      FetchChainsStatsParams
    >({
      queryFn: createNotifyingQueryFn(
        async ({ gateway = getAccountingGateway(), group }) => {
          const data = await gateway.getPrivateStats(
            PrivateStatsInterval.DAY,
            group,
          );

          return { data };
        },
      ),
    }),
  }),
});
