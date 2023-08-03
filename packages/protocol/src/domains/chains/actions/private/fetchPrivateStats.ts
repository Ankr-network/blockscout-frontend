import {
  IApiPrivateStats,
  IApiUserGroupParams,
  PrivateStats,
  PrivateStatsInterval,
} from 'multirpc-sdk';

import { GetState } from 'store';
import { MultiService } from 'modules/api/MultiService';
import { authorizationGuard } from 'domains/auth/utils/authorizationGuard';
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
          async ({ interval, userEndpointToken, group }, { getState }) => {
            await authorizationGuard(getState as GetState);
            const service = MultiService.getService();
            const accountGateway = service.getAccountGateway();

            const data = await (userEndpointToken
              ? accountGateway.getPrivateStatsByPremiumId(
                  interval,
                  userEndpointToken,
                  group,
                )
              : accountGateway.getPrivateStats(interval, group));

            return { data: getPrivateStats(data) };
          },
        ),
      },
    ),
  }),
});
