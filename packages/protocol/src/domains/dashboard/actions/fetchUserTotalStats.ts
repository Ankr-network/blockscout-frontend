import { IApiUserGroupParams, TotalStatsBlockchainsInfo } from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { web3Api } from 'store/queries';

export type FetchUserTotalStatsParams = Pick<IApiUserGroupParams, 'group'>;

export const {
  endpoints: { fetchUserTotalStats },
  useLazyFetchUserTotalStatsQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchUserTotalStats: build.query<
      TotalStatsBlockchainsInfo,
      FetchUserTotalStatsParams
    >({
      queryFn: createNotifyingQueryFn(async ({ group }) => {
        const api = MultiService.getService().getAccountGateway();

        const data = await api.getUserTotalStats(group);

        return { data };
      }),
    }),
  }),
  overrideExisting: true,
});
