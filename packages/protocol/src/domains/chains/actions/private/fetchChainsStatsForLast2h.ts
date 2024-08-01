import {
  PrivateStats,
  StatsByRangeDuration,
  StatsByRangeTimeframe,
} from 'multirpc-sdk';

import { getAccountingGateway } from 'modules/api/MultiService';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { web3Api } from 'store/queries';

import { FetchChainsStatsParams } from './types';

export const {
  endpoints: { fetchChainsStatsForLastTwoHours },
  useFetchChainsStatsForLastTwoHoursQuery,
  useLazyFetchChainsStatsForLastTwoHoursQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchChainsStatsForLastTwoHours: build.query<
      PrivateStats,
      FetchChainsStatsParams
    >({
      queryFn: createNotifyingQueryFn(
        async ({ gateway = getAccountingGateway(), group }) => {
          const data = await gateway.getUserStatsByRange({
            group,
            duration: StatsByRangeDuration.TWO_HOURS,
            timeframe: StatsByRangeTimeframe.FIVE_MINUTES,
          });

          return { data };
        },
      ),
    }),
  }),
});
