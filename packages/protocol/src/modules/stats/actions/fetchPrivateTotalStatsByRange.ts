import { GetStatsByRangeParams, StatsByRangeResponse } from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { createQuerySelectors } from 'store/utils/createQuerySelectors';
import { web3Api } from 'store/queries';

import { REFETCH_STATS_INTERVAL } from '../const';

export interface IFetchPrivateTotalStatsByRangeParams
  extends GetStatsByRangeParams {}

// The endpoint name is listed in endpointsSerializedByParams constant
// in packages/protocol/src/store/queries/index.ts file.
// If the name has changed it should be refelected there as well.
export const {
  endpoints: { fetchPrivateTotalStatsByRange },
  useFetchPrivateTotalStatsByRangeQuery,
  useLazyFetchPrivateTotalStatsByRangeQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchPrivateTotalStatsByRange: build.query<
      StatsByRangeResponse,
      IFetchPrivateTotalStatsByRangeParams
    >({
      keepUnusedDataFor: REFETCH_STATS_INTERVAL,
      queryFn: createNotifyingQueryFn(async params => {
        const api = MultiService.getService().getAccountingGateway();

        const data = await api.getUserStatsByRange(params);

        return { data };
      }),
    }),
  }),
  overrideExisting: true,
});

export const {
  selectDataWithFallbackCachedByParams: selectPrivateTotalStatsByRange,
  selectLoadingCachedByParams: selectPrivateTotalStatsByRangeLoading,
  selectStateCachedByParams: selectPrivateTotalStatsByRangeState,
} = createQuerySelectors({
  endpoint: fetchPrivateTotalStatsByRange,
  fallback: {},
});
