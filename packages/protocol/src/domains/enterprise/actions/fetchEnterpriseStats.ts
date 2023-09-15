import {
  IApiUserGroupParams,
  PrivateStats,
  PrivateStatsInterval,
} from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { web3Api } from 'store/queries';

export interface FetchEnterpriseStatsParams extends IApiUserGroupParams {
  interval: PrivateStatsInterval;
  userEndpointToken?: string;
}

export const {
  useLazyChainsFetchEnterpriseStatsQuery,
  endpoints: { chainsFetchEnterpriseStats },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    chainsFetchEnterpriseStats: build.query<
      PrivateStats,
      FetchEnterpriseStatsParams
    >({
      queryFn: createNotifyingQueryFn(
        async ({ interval, userEndpointToken }) => {
          const service = MultiService.getService();
          const enterpriseGateway = service.getEnterpriseGateway();

          const data = await (userEndpointToken
            ? enterpriseGateway.getEnterpriseStatsByPremiumId(
                interval,
                userEndpointToken,
              )
            : enterpriseGateway.getEnterpriseStats(interval));

          return { data };
        },
      ),
    }),
  }),
  overrideExisting: true,
});
