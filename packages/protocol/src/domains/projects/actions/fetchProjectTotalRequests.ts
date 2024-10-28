import {
  StatsByRangeRequest,
  StatsByRangeResponse,
  StatsByRangeTimeframe,
} from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';
import { REFETCH_STATS_INTERVAL } from 'modules/common/constants/const';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { createQuerySelectors } from 'store/utils/createQuerySelectors';
import { web3Api } from 'store/queries';

export interface IFetchProjectTotalRequestsParams
  extends Pick<StatsByRangeRequest, 'duration' | 'group' | 'token'> {}

// The endpoint name is listed in endpointsSerializedByParams constant
// in packages/protocol/src/store/queries/index.ts file.
// If the name has changed it should be refelected there as well.
export const {
  endpoints: { fetchProjectTotalRequests },
  useFetchProjectTotalRequestsQuery,
  useLazyFetchProjectTotalRequestsQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchProjectTotalRequests: build.query<
      StatsByRangeResponse,
      IFetchProjectTotalRequestsParams
    >({
      keepUnusedDataFor: REFETCH_STATS_INTERVAL,
      queryFn: createNotifyingQueryFn(async ({ duration, group, token }) => {
        const api = MultiService.getService().getAccountingGateway();

        const data = await api.getUserStatsByRange({
          duration,
          group,
          timeframe: StatsByRangeTimeframe.HOUR,
          token,
        });

        return { data };
      }),
    }),
  }),
  overrideExisting: true,
});

export const {
  selectDataWithFallbackCachedByParams: selectProjectTotalRequests,
  selectLoadingCachedByParams: selectProjectTotalRequestsLoading,
  selectStateCachedByParams: selectProjectTotalRequestsState,
} = createQuerySelectors({
  endpoint: fetchProjectTotalRequests,
  fallback: {},
});
