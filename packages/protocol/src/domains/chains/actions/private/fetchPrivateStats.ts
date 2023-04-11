import {
  IApiPrivateStats,
  PrivateStats,
  PrivateStatsInterval,
} from 'multirpc-sdk';

import { GetState } from 'store';
import { MultiService } from 'modules/api/MultiService';
import { authorizationGuard } from 'domains/auth/utils/authorizationGuard';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { web3Api } from 'store/queries';
import { getSelectedGroupAddress } from 'domains/userGroup/utils/getSelectedGroupAddress';

const getPrivateStats = (data: IApiPrivateStats): PrivateStats => {
  return {
    ...data,
    totalRequests: data?.total_requests ?? 0,
  };
};

interface FetchPrivateStatsParams {
  interval: PrivateStatsInterval;
  userEndpointToken?: string;
}

export const {
  endpoints: { chainsFetchPrivateStats },
  useChainsFetchPrivateStatsQuery,
  useLazyChainsFetchPrivateStatsQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    chainsFetchPrivateStats: build.query<PrivateStats, FetchPrivateStatsParams>(
      {
        queryFn: createNotifyingQueryFn(
          async ({ interval, userEndpointToken }, { getState }) => {
            await authorizationGuard(getState as GetState);
            const group = getSelectedGroupAddress(getState as GetState);
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
