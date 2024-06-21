import {
  IApiUserGroupParams,
  PrivateStats,
  PrivateStatsInterval,
} from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { web3Api } from 'store/queries';

export interface FetchEnterpriseStatsByApiKeyParams
  extends IApiUserGroupParams {
  interval: PrivateStatsInterval;
  userEndpointToken: string;
}

export const {
  endpoints: { chainsFetchEnterpriseStatsByApiKey },
  useLazyChainsFetchEnterpriseStatsByApiKeyQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    chainsFetchEnterpriseStatsByApiKey: build.query<
      PrivateStats,
      FetchEnterpriseStatsByApiKeyParams
    >({
      queryFn: createNotifyingQueryFn(
        async ({ group, interval, userEndpointToken }) => {
          const service = MultiService.getService();
          const enterpriseGateway = service.getEnterpriseGateway();

          const data = await enterpriseGateway.getPrivateStatsByPremiumId(
            interval,
            userEndpointToken,
            group,
          );

          return { data };
        },
      ),
    }),
  }),
  overrideExisting: true,
});
