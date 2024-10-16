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

export interface IFetchProjectChainsStatsFor1hParams
  extends IApiUserGroupParams,
    Gateway {
  token: string;
}

// The endpoint name is listed in endpointsSerializedByParams constant
// in packages/protocol/src/store/queries/index.ts file.
// If the name has changed it should be refelected there as well.
export const {
  endpoints: { fetchProjectChainsStatsFor1h },
  useFetchProjectChainsStatsFor1hQuery,
  useLazyFetchProjectChainsStatsFor1hQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchProjectChainsStatsFor1h: build.query<
      PrivateStats,
      IFetchProjectChainsStatsFor1hParams
    >({
      keepUnusedDataFor: REFETCH_STATS_INTERVAL,
      queryFn: createNotifyingQueryFn(
        async ({ gateway = getAccountingGateway(), group, token }) => {
          const data = await gateway.getPrivateStatsByPremiumId(
            PrivateStatsInterval.HOUR,
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
  selectDataWithFallbackCachedByParams: selectProjectChainsStatsFor1h,
  selectLoadingCachedByParams: selectProjectChainsStatsFor1hLoading,
  selectStateCachedByParams: selectProjectChainsStatsFor1hState,
} = createQuerySelectors({
  endpoint: fetchProjectChainsStatsFor1h,
  fallback: {},
});
