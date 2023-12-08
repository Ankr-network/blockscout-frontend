import {
  StatsByRangeDuration,
  StatsByRangeRequest,
  StatsByRangeResponse,
  StatsByRangeTimeframe,
} from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { web3Api } from 'store/queries';

export interface FetchProjectTotalRequestsForLastTwoHoursParams
  extends Pick<StatsByRangeRequest, 'group' | 'token'> {}

export const {
  endpoints: { fetchProjectTotalRequestsForLastTwoHours },
  useFetchProjectTotalRequestsForLastTwoHoursQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchProjectTotalRequestsForLastTwoHours: build.query<
      StatsByRangeResponse,
      FetchProjectTotalRequestsForLastTwoHoursParams
    >({
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
