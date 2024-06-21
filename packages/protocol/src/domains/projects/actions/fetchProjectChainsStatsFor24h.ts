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

export type FetchProjectChainsStatsFor24hParams = IApiUserGroupParams &
  Gateway & {
    token: string;
  };

export const {
  endpoints: { fetchProjectChainsStatsFor24h },
  useFetchProjectChainsStatsFor24hQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchProjectChainsStatsFor24h: build.query<
      PrivateStats,
      FetchProjectChainsStatsFor24hParams
    >({
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
