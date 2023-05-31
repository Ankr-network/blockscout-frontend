import { TotalStatsBlockchainsInfo } from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { web3Api } from 'store/queries';

export const {
  endpoints: { fetchUserTotalStats },
  useFetchUserTotalStatsQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchUserTotalStats: build.query<TotalStatsBlockchainsInfo, void>({
      queryFn: createNotifyingQueryFn(async () => {
        const api = MultiService.getService().getAccountGateway();

        const data = await api.getUserTotalStats();

        return { data };
      }),
    }),
  }),
  overrideExisting: true,
});
