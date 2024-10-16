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

export interface FetchProjectTotalRequestsForLastTwoHoursParams
  extends Pick<StatsByRangeRequest, 'group' | 'token'> {}

// The endpoint name is listed in endpointsSerializedByParams constant
// in packages/protocol/src/store/queries/index.ts file.
// If the name has changed it should be refelected there as well.
export const {
  endpoints: { fetchProjectTotalRequestsForLastTwoHours },
  useFetchProjectTotalRequestsForLastTwoHoursQuery,
  useLazyFetchProjectTotalRequestsForLastTwoHoursQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchProjectTotalRequestsForLastTwoHours: build.query<
      StatsByRangeResponse,
      FetchProjectTotalRequestsForLastTwoHoursParams
    >({
      keepUnusedDataFor: REFETCH_STATS_INTERVAL,
      queryFn: createNotifyingQueryFn(async ({ group, token }) => {
        const api = MultiService.getService().getAccountingGateway();

        const data = await api.getUserStatsByRange({
          duration: StatsByRangeDuration.TWO_HOURS,
          group,
          timeframe: StatsByRangeTimeframe.FIVE_MINUTES,
          token,
        });

        return { data };
      }),
    }),
  }),
});

export const {
  selectDataWithFallbackCachedByParams:
    selectProjectTotalRequestsForLastTwoHours,
  selectLoadingCachedByParams: selectProjectTotalRequestsForLastTwoHoursLoading,
  selectStateCachedByParams: selectProjectTotalRequestsForLastTwoHoursState,
} = createQuerySelectors({
  endpoint: fetchProjectTotalRequestsForLastTwoHours,
  fallback: {},
});
