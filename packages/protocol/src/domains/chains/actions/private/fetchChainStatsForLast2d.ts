import { PrivateStats, PrivateStatsInterval } from 'multirpc-sdk';

import { getAccountingGateway } from 'modules/api/MultiService';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { web3Api } from 'store/queries';

import { FetchChainsStatsParams } from './types';

export const {
  endpoints: { fetchChainStatsForLastTwoDays },
  useFetchChainStatsForLastTwoDaysQuery,
  useLazyFetchChainStatsForLastTwoDaysQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchChainStatsForLastTwoDays: build.query<
      PrivateStats,
      FetchChainsStatsParams
    >({
      queryFn: createNotifyingQueryFn(
        async ({ gateway = getAccountingGateway(), group }) => {
          const data = await gateway.getPrivateStats(
            PrivateStatsInterval.TWO_DAYS,
            group,
          );

          return { data };
        },
      ),
    }),
  }),
  overrideExisting: true,
});
