import {
  IApiUserGroupParams,
  PrivateStats,
  PrivateStatsInterval,
} from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { web3Api } from 'store/queries';

export interface FetchEnterpriseStatsTotalParams extends IApiUserGroupParams {
  interval: PrivateStatsInterval;
}

export const {
  endpoints: { chainsFetchEnterpriseStatsTotal },
  useLazyChainsFetchEnterpriseStatsTotalQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    chainsFetchEnterpriseStatsTotal: build.query<
      PrivateStats,
      FetchEnterpriseStatsTotalParams
    >({
      queryFn: createNotifyingQueryFn(async ({ interval }) => {
        const service = MultiService.getService();
        const enterpriseGateway = service.getEnterpriseGateway();

        const data = await enterpriseGateway.getPrivateStats(interval);

        return { data };
      }),
    }),
  }),
  overrideExisting: true,
});
