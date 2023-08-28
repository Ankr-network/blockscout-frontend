import {
  IApiPrivateStats,
  IApiUserGroupParams,
  PrivateStats,
  PrivateStatsInterval,
} from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { web3Api } from 'store/queries';

const getPrivateStats = (data: IApiPrivateStats): PrivateStats => {
  return {
    ...data,
    totalRequests: data?.total_requests ?? 0,
  };
};

export interface FetchPrivateStatsParams extends IApiUserGroupParams {
  interval: PrivateStatsInterval;
  userEndpointToken?: string;
}

export const {
  endpoints: { chainsFetchPrivateStats },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    chainsFetchPrivateStats: build.query<PrivateStats, FetchPrivateStatsParams>(
      {
        queryFn: createNotifyingQueryFn(
          async ({ interval, userEndpointToken, group }) => {
            const service = MultiService.getService();
            const accountingGateway = service.getAccountingGateway();

            const data = await (userEndpointToken
              ? accountingGateway.getPrivateStatsByPremiumId(
                  interval,
                  userEndpointToken,
                  group,
                )
              : accountingGateway.getPrivateStats(interval, group));

            return { data: getPrivateStats(data) };
          },
        ),
      },
    ),
  }),
});
