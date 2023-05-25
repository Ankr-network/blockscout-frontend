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

export const {
  useLazyChainsFetchWeekPrivateStatsQuery,
  endpoints: { chainsFetchWeekPrivateStats },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    chainsFetchWeekPrivateStats: build.query<
      IApiPrivateStats,
      IApiUserGroupParams
    >({
      queryFn: createNotifyingQueryFn(async ({ group }) => {
        const service = MultiService.getService();

        const result = await service
          .getAccountGateway()
          .getPrivateStats(PrivateStatsInterval.WEEK, group);

        return { data: getPrivateStats(result) };
      }),
    }),
  }),
});
