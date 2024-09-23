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
    totalRequests: data?.total_requests || 0,
  };
};

export const {
  endpoints: { chainsFetchMonthPrivateStats },
  useLazyChainsFetchMonthPrivateStatsQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    chainsFetchMonthPrivateStats: build.query<
      IApiPrivateStats,
      IApiUserGroupParams
    >({
      queryFn: createNotifyingQueryFn(async ({ group }) => {
        const service = MultiService.getService();

        const result = await service
          .getAccountingGateway()
          .getPrivateStats(PrivateStatsInterval.MONTH, group);

        return { data: getPrivateStats(result) };
      }),
    }),
  }),
});
