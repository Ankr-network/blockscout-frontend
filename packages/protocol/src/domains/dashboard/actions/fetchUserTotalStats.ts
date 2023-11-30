import { IApiUserGroupParams, TotalStatsBlockchainsInfo } from 'multirpc-sdk';

import { getAccountingGateway } from 'modules/api/MultiService';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { web3Api } from 'store/queries';

import { Gateway } from '../types';

export type FetchUserTotalStatsParams = IApiUserGroupParams & Gateway;

export const {
  endpoints: { fetchUserTotalStats },
  useLazyFetchUserTotalStatsQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchUserTotalStats: build.query<
      TotalStatsBlockchainsInfo,
      FetchUserTotalStatsParams
    >({
      queryFn: createNotifyingQueryFn(
        async ({ group, gateway = getAccountingGateway() }) => {
          const data = await gateway.getUserTotalStats(group);

          return { data };
        },
      ),
    }),
  }),
  overrideExisting: true,
});
