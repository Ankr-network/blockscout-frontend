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
import { ALL_PROJECTS_VALUE } from 'domains/projects/const';

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

export const {
  endpoints: { chainsFetchPrivateStats },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    chainsFetchPrivateStats: build.query<PrivateStats, FetchPrivateStatsParams>(
      {
        queryFn: createNotifyingQueryFn(
          async ({
            gateway = getAccountingGateway(),
            group,
            interval,
            userEndpointToken,
          }) => {
            const data = await (userEndpointToken &&
            userEndpointToken !== ALL_PROJECTS_VALUE
              ? gateway.getPrivateStatsByPremiumId(
                  interval,
                  userEndpointToken,
                  group,
                )
              : gateway.getPrivateStats(interval, group));

            return { data: getPrivateStats(data) };
          },
        ),
      },
    ),
  }),
});
