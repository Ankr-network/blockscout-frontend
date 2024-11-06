import { GetPrivateStatsParams, PrivateStatsResponse } from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { createQuerySelectors } from 'store/utils/createQuerySelectors';
import { web3Api } from 'store/queries';

import { REFETCH_STATS_INTERVAL } from '../const';

export interface IFetchEnterprisePrivateStatsParams
  extends GetPrivateStatsParams {}

// The endpoint name is listed in endpointsSerializedByParams constant
// in packages/protocol/src/store/queries/index.ts file.
// If the name has changed it should be refelected there as well.
export const {
  endpoints: { fetchEnterprisePrivateStats },
  useFetchEnterprisePrivateStatsQuery,
  useLazyFetchEnterprisePrivateStatsQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchEnterprisePrivateStats: build.query<
      PrivateStatsResponse,
      IFetchEnterprisePrivateStatsParams
    >({
      keepUnusedDataFor: REFETCH_STATS_INTERVAL,
      queryFn: createNotifyingQueryFn(async ({ group, interval }) => {
        const api = MultiService.getService().getEnterpriseGateway();
        const data = await api.getPrivateStats({ group, interval });

        return { data };
      }),
    }),
  }),
  overrideExisting: true,
});

const fallback: PrivateStatsResponse = {
  total_requests: 0,
  stats: {},
};

export const {
  selectDataWithFallbackCachedByParams: selectEnterprisePrivateStats,
  selectLoadingCachedByParams: selectEnterprisePrivateStatsLoading,
  selectStateCachedByParams: selectEnterprisePrivateStatsState,
} = createQuerySelectors({
  endpoint: fetchEnterprisePrivateStats,
  fallback,
});
