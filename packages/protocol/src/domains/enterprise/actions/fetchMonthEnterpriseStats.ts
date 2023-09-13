import {
  IApiPrivateStats,
  IApiUserGroupParams,
  PrivateStatsInterval,
} from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { web3Api } from 'store/queries';

import { getEnterpriseStats } from './utils';

export const {
  useLazyChainsFetchMonthEnterpriseStatsQuery,
  endpoints: { chainsFetchMonthEnterpriseStats },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    chainsFetchMonthEnterpriseStats: build.query<
      IApiPrivateStats,
      IApiUserGroupParams
    >({
      queryFn: createNotifyingQueryFn(async ({ group }) => {
        const service = MultiService.getService();

        const result = await service
          .getEnterpriseGateway()
          .getEnterpriseStats(PrivateStatsInterval.MONTH, group);

        return { data: getEnterpriseStats(result) };
      }),
    }),
  }),
  overrideExisting: true,
});
