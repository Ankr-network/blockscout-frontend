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

export type FetchProjectStatsFor24hParams = IApiUserGroupParams &
  Gateway & {
    userEndpointToken: string;
  };

export const {
  endpoints: { chainsFetchProjectStatsFor24h },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    chainsFetchProjectStatsFor24h: build.query<
      PrivateStats,
      FetchProjectStatsFor24hParams
    >({
      queryFn: createNotifyingQueryFn(
        async ({
          userEndpointToken,
          group,
          gateway = getAccountingGateway(),
        }) => {
          const data = await gateway.getPrivateStatsByPremiumId(
            PrivateStatsInterval.DAY,
            userEndpointToken,
            group,
          );

          return { data: getPrivateStats(data) };
        },
      ),
    }),
  }),
});
