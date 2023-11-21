import { PrivateStats, PrivateStatsInterval } from 'multirpc-sdk';

import { getAccountingGateway } from 'modules/api/MultiService';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { web3Api } from 'store/queries';
import { FetchPrivateStatsParams } from 'domains/chains/actions/private/fetchPrivateStats';
import { Gateway } from 'domains/dashboard/types';

export type FetchLastMonthStatsParams = Pick<
  FetchPrivateStatsParams,
  'group' | 'userEndpointToken'
> &
  Gateway;

const interval = PrivateStatsInterval.MONTH;

export const {
  endpoints: { fetchLastMonthStats },
  useLazyFetchLastMonthStatsQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchLastMonthStats: build.query<PrivateStats, FetchLastMonthStatsParams>({
      queryFn: createNotifyingQueryFn(
        async ({
          group,
          userEndpointToken,
          gateway = getAccountingGateway(),
        }) => {
          const data = userEndpointToken
            ? await gateway.getPrivateStatsByPremiumId(
                interval,
                userEndpointToken,
                group,
              )
            : await gateway.getPrivateStats(interval, group);

          return { data };
        },
      ),
    }),
  }),
  overrideExisting: true,
});
