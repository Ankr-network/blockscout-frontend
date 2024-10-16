import {
  StatsByRangeDuration,
  StatsByRangeRequest,
  StatsByRangeResponse,
  StatsByRangeTimeframe,
} from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';
import { REFETCH_STATS_INTERVAL } from 'modules/common/constants/const';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { createQuerySelectors } from 'store/utils/createQuerySelectors';
import { web3Api } from 'store/queries';

export interface FetchProjectTotalRequestsForLastTwoDaysParams
  extends Pick<StatsByRangeRequest, 'group' | 'token'> {}

// The endpoint name is listed in endpointsSerializedByParams constant
// in packages/protocol/src/store/queries/index.ts file.
// If the name has changed it should be refelected there as well.
export const {
  endpoints: { fetchProjectTotalRequestsForLastTwoDays },
  useFetchProjectTotalRequestsForLastTwoDaysQuery,
  useLazyFetchProjectTotalRequestsForLastTwoDaysQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchProjectTotalRequestsForLastTwoDays: build.query<
      StatsByRangeResponse,
      FetchProjectTotalRequestsForLastTwoDaysParams
    >({
      keepUnusedDataFor: REFETCH_STATS_INTERVAL,
      queryFn: createNotifyingQueryFn(async params => {
        const api = MultiService.getService().getAccountingGateway();

        const { group, token } = params;

        const data = await api.getUserStatsByRange({
          duration: StatsByRangeDuration.TWO_DAYS,
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
  selectDataWithFallbackCachedByParams:
    selectProjectTotalRequestsForLastTwoDays,
  selectLoadingCachedByParams: selectProjectTotalRequestsForLastTwoDaysLoading,
  selectStateCachedByParams: selectProjectTotalRequestsForLastTwoDaysState,
} = createQuerySelectors({
  endpoint: fetchProjectTotalRequestsForLastTwoDays,
  fallback: {},
});
