import {
  IApiPrivateStats,
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
  useLazyChainsFetchMonthPrivateStatsQuery,
  endpoints: { chainsFetchMonthPrivateStats },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    chainsFetchMonthPrivateStats: build.query<IApiPrivateStats, void>({
      queryFn: createNotifyingQueryFn(async () => {
        const service = MultiService.getService();

        const result = await service
          .getAccountGateway()
          .getPrivateStats(PrivateStatsInterval.MONTH);

        return { data: getPrivateStats(result) };
      }),
    }),
  }),
});
