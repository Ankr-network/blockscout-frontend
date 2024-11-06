import {
  PrivateStatsInterval,
  Top10StatsParams,
  Top10StatsResponse,
} from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { createQuerySelectors } from 'store/utils/createQuerySelectors';
import { web3Api } from 'store/queries';

import { REFETCH_STATS_INTERVAL } from '../const';

export interface IFetchEnterprisePrivateTop10StatsParams
  extends Omit<Top10StatsParams, 'intervalType'> {
  interval: PrivateStatsInterval;
}

const fallback: Top10StatsResponse = { countries: [], ips: [] };

// The endpoint name is listed in endpointsSerializedByParams constant
// in packages/protocol/src/store/queries/index.ts file.
// If the name has changed it should be refelected there as well.
export const {
  endpoints: { fetchEnterprisePrivateTop10Stats },
  useFetchEnterprisePrivateTop10StatsQuery,
  useLazyFetchEnterprisePrivateTop10StatsQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchEnterprisePrivateTop10Stats: build.query<
      Top10StatsResponse,
      IFetchEnterprisePrivateTop10StatsParams
    >({
      keepUnusedDataFor: REFETCH_STATS_INTERVAL,
      queryFn: createNotifyingQueryFn(
        async ({ blockchain, group, interval }) => {
          /* backend does not support h1 and h24 interval for this endpoint */
          if (
            interval !== PrivateStatsInterval.WEEK &&
            interval !== PrivateStatsInterval.MONTH
          ) {
            return { data: fallback };
          }

          const api = MultiService.getService().getEnterpriseGateway();

          const data = await api.getTop10Stats({
            blockchain,
            group,
            intervalType: interval,
          });

          return { data };
        },
      ),
    }),
  }),
  overrideExisting: true,
});

export const {
  selectDataWithFallbackCachedByParams: selectEnterprisePrivateTop10Stats,
  selectLoadingCachedByParams: selectEnterprisePrivateTop10StatsLoading,
  selectStateCachedByParams: selectEnterprisePrivateTop10StatsState,
} = createQuerySelectors({
  endpoint: fetchEnterprisePrivateTop10Stats,
  fallback,
});
