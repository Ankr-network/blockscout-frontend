import { TotalStatsBlockchainsInfo, Web3Address } from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { createQuerySelectors } from 'store/utils/createQuerySelectors';
import { web3Api } from 'store/queries';

import { REFETCH_STATS_INTERVAL } from '../const';

export interface IFetchPrivateTotalStatsParams {
  group: Web3Address | undefined;
}

// The endpoint name is listed in endpointsSerializedByParams constant
// in packages/protocol/src/store/queries/index.ts file.
// If the name has changed it should be refelected there as well.
export const {
  endpoints: { fetchPrivateTotalStats },
  useFetchPrivateTotalStatsQuery,
  useLazyFetchPrivateTotalStatsQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchPrivateTotalStats: build.query<
      TotalStatsBlockchainsInfo,
      IFetchPrivateTotalStatsParams
    >({
      keepUnusedDataFor: REFETCH_STATS_INTERVAL,
      queryFn: createNotifyingQueryFn(async ({ group }) => {
        const api = MultiService.getService().getAccountingGateway();

        const data = await api.getUserTotalStats(group);

        return { data };
      }),
    }),
  }),
  overrideExisting: true,
});

export const {
  selectDataCachedByParams: selectPrivateTotalStats,
  selectLoadingCachedByParams: selectPrivateTotalStatsLoading,
  selectStateCachedByParams: selectPrivateTotalStatsState,
} = createQuerySelectors({ endpoint: fetchPrivateTotalStats });
