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
  endpoints: { chainsFetchMonthEnterpriseStats },
  useLazyChainsFetchMonthEnterpriseStatsQuery,
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
          .getPrivateStats(PrivateStatsInterval.MONTH, group);

        return { data: getEnterpriseStats(result) };
      }),
    }),
  }),
  overrideExisting: true,
});
