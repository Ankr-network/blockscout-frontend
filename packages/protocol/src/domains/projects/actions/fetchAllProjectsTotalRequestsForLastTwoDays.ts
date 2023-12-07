import {
  StatsByRangeDuration,
  StatsByRangeResponse,
  StatsByRangeTimeframe,
} from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';
import { web3Api } from 'store/queries';

export interface FetchAllProjectsTotalRequestsForLastTwoDaysParams {
  tokens: string[];
  group?: string;
}

export interface StatsByRangeResult {
  [userEndpointToken: string]: StatsByRange;
}

export interface StatsByRange {
  error?: string;
  data?: StatsByRangeResponse;
}

const isFulfilled = (
  result: PromiseSettledResult<StatsByRangeResponse>,
): result is PromiseFulfilledResult<StatsByRangeResponse> =>
  result.status === 'fulfilled';

const isRejected = (
  result: PromiseSettledResult<StatsByRangeResponse>,
): result is PromiseRejectedResult => result.status === 'rejected';

const duration = StatsByRangeDuration.TWO_DAYS;
const timeframe = StatsByRangeTimeframe.HOUR;

export const {
  endpoints: { fetchAllProjectsTotalRequestsForLastTwoDays },
  useFetchAllProjectsTotalRequestsForLastTwoDaysQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchAllProjectsTotalRequestsForLastTwoDays: build.query<
      StatsByRangeResult,
      FetchAllProjectsTotalRequestsForLastTwoDaysParams
    >({
      queryFn: async ({ group, tokens }) => {
        const service = MultiService.getService().getAccountingGateway();

        const promises = tokens.map(token =>
          service.getUserStatsByRange({ duration, group, timeframe, token }),
        );

        const results = await Promise.allSettled(promises);

        const data = results.reduce<StatsByRangeResult>(
          (stats, result, index) => {
            const userEndpointToken = tokens[index];

            stats[userEndpointToken] = {
              data: isFulfilled(result) ? result.value : undefined,
              error: isRejected(result) ? result.reason : undefined,
            };

            return stats;
          },
          {},
        );

        return { data };
      },
    }),
  }),
  overrideExisting: true,
});
