import {
  IApiPrivateStats,
  IApiUserGroupParams,
  PrivateStats,
  PrivateStatsInterval,
} from 'multirpc-sdk';

import { getAccountingGateway } from 'modules/api/MultiService';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { web3Api } from 'store/queries';
import { Gateway } from 'domains/dashboard/types';
import { createQuerySelectors } from 'store/utils/createQuerySelectors';

const getPrivateStats = (data: IApiPrivateStats): PrivateStats => {
  return {
    ...data,
    totalRequests: data?.total_requests ?? 0,
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
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchProjectChainsStatsFor1h: build.query<
      PrivateStats,
      IFetchProjectChainsStatsFor1hParams
    >({
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
  selectDataCachedByParams: selectDataForLastHour,
  selectLoadingCachedByParams: selectLoading,
  selectStateCachedByParams: selectStateForLastHourChainsStats,
} = createQuerySelectors({
  endpoint: fetchProjectChainsStatsFor1h,
});
