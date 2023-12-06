import {
  StatsByRangeDuration,
  StatsByRangeRequest,
  StatsByRangeResponse,
  StatsByRangeTimeframe,
} from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { web3Api } from 'store/queries';

export interface FetchProjectTotalRequestsForLastTwoDaysParams
  extends Pick<StatsByRangeRequest, 'group' | 'token'> {}

export const {
  endpoints: { fetchProjectTotalRequestsForLastTwoDays },
  useFetchProjectTotalRequestsForLastTwoDaysQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchProjectTotalRequestsForLastTwoDays: build.query<
      StatsByRangeResponse,
      FetchProjectTotalRequestsForLastTwoDaysParams
    >({
      queryFn: createNotifyingQueryFn(async ({ group, token }) => {
        const api = MultiService.getService().getAccountingGateway();

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
});
