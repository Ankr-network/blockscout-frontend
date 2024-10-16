import {
  IApiPrivateStats,
  IApiUserGroupParams,
  PrivateStats,
  PrivateStatsInterval,
} from 'multirpc-sdk';

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

export interface IFetchProjectChainsStatsFor24hParams
  extends IApiUserGroupParams,
    Gateway {
  token: string;
}

// The endpoint name is listed in endpointsSerializedByParams constant
// in packages/protocol/src/store/queries/index.ts file.
// If the name has changed it should be refelected there as well.
export const {
  endpoints: { fetchProjectChainsStatsFor24h },
  useFetchProjectChainsStatsFor24hQuery,
  useLazyFetchProjectChainsStatsFor24hQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchProjectChainsStatsFor24h: build.query<
      PrivateStats,
      IFetchProjectChainsStatsFor24hParams
    >({
      keepUnusedDataFor: REFETCH_STATS_INTERVAL,
      queryFn: createNotifyingQueryFn(
        async ({ gateway = getAccountingGateway(), group, token }) => {
          const data = await gateway.getPrivateStatsByPremiumId(
            PrivateStatsInterval.DAY,
            token,
            group,
          );

          return { data: getPrivateStats(data) };
        },
      ),
    }),
  }),
});

export const {
  selectDataWithFallbackCachedByParams: selectProjectChainsStatsFor24h,
  selectLoadingCachedByParams: selectProjectChainsStatsFor24hLoading,
  selectStateCachedByParams: selectProjectChainsStatsFor24hState,
} = createQuerySelectors({
  endpoint: fetchProjectChainsStatsFor24h,
  fallback: {},
});
