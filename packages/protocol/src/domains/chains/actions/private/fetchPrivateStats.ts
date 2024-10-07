import {
  IApiPrivateStats,
  IApiUserGroupParams,
  PrivateStats,
  PrivateStatsInterval,
} from 'multirpc-sdk';

import { ALL_PROJECTS_VALUE } from 'domains/projects/const';
import { Gateway } from 'domains/dashboard/types';
import { REFETCH_STATS_INTERVAL } from 'modules/common/constants/const';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { createQuerySelectors } from 'store/utils/createQuerySelectors';
import { getAccountingGateway } from 'modules/api/MultiService';
import { web3Api } from 'store/queries';

const getPrivateStats = (data: IApiPrivateStats): PrivateStats => {
  return {
    ...data,
    totalRequests: data?.total_requests || 0,
  };
};

export type FetchPrivateStatsParams = IApiUserGroupParams &
  Gateway & {
    interval: PrivateStatsInterval;
    userEndpointToken?: string;
  };

// The endpoint name is listed in endpointsSerializedByParams constant
// in packages/protocol/src/store/queries/index.ts file.
// If the name has changed it should be refelected there as well.
export const {
  endpoints: { fetchPrivateStats },
  useFetchPrivateStatsQuery,
  useLazyFetchPrivateStatsQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchPrivateStats: build.query<PrivateStats, FetchPrivateStatsParams>({
      keepUnusedDataFor: REFETCH_STATS_INTERVAL,
      queryFn: createNotifyingQueryFn(
        async ({
          gateway = getAccountingGateway(),
          group,
          interval,
          userEndpointToken,
        }) => {
          const hasProjectToken =
            userEndpointToken && userEndpointToken !== ALL_PROJECTS_VALUE;

          const promise = hasProjectToken
            ? gateway.getPrivateStatsByPremiumId(
                interval,
                userEndpointToken,
                group,
              )
            : gateway.getPrivateStats(interval, group);

          const data = await promise;

          return { data: getPrivateStats(data) };
        },
      ),
    }),
  }),
});

export const {
  selectDataWithFallbackCachedByParams: selectPrivateStats,
  selectLoadingCachedByParams: selectPrivateStatsLoading,
  selectStateCachedByParams: selectPrivateStatsState,
} = createQuerySelectors({
  endpoint: fetchPrivateStats,
  fallback: {},
});
