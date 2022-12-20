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

const getPrivateStats = (data: IApiPrivateStats): PrivateStats => {
  return {
    ...data,
    totalRequests: data?.total_requests ?? 0,
  };
};

export const {
  endpoints: { chainsFetchPrivateStats },
  useChainsFetchPrivateStatsQuery,
  useLazyChainsFetchPrivateStatsQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    chainsFetchPrivateStats: build.query<PrivateStats, PrivateStatsInterval>({
      queryFn: createNotifyingQueryFn(async (interval, { getState }) => {
        await authorizationGuard(getState as GetState);
        const service = MultiService.getService();

        const data = await service
          .getAccountGateway()
          .getPrivateStats(interval);

        return { data: getPrivateStats(data) };
      }),
    }),
  }),
});
