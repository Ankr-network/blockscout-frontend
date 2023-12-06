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

const getPrivateStats = (data: IApiPrivateStats): PrivateStats => {
  return {
    ...data,
    totalRequests: data?.total_requests ?? 0,
  };
};

export type FetchProjectChainsStatsFor1hParams = IApiUserGroupParams &
  Gateway & {
    token: string;
  };

export const {
  endpoints: { fetchProjectChainsStatsFor1h },
  useFetchProjectChainsStatsFor1hQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchProjectChainsStatsFor1h: build.query<
      PrivateStats,
      FetchProjectChainsStatsFor1hParams
    >({
      queryFn: createNotifyingQueryFn(
        async ({ token, group, gateway = getAccountingGateway() }) => {
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
