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
  useLazyChainsFetchEnterpriseStatsTotalQuery,
  endpoints: { chainsFetchEnterpriseStatsTotal },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    chainsFetchEnterpriseStatsTotal: build.query<
      PrivateStats,
      FetchEnterpriseStatsTotalParams
    >({
      queryFn: createNotifyingQueryFn(async ({ interval, group }) => {
        const service = MultiService.getService();
        const enterpriseGateway = service.getEnterpriseGateway();

        const data = await enterpriseGateway.getPrivateStats(interval, group);

        return { data };
      }),
    }),
  }),
  overrideExisting: true,
});
