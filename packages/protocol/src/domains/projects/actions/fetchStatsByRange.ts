import {
  StatsByRangeDuration,
  StatsByRangeResponse,
  StatsByRangeTimeframe,
} from 'multirpc-sdk';

import { JwtManagerToken } from 'domains/jwtToken/store/jwtTokenManagerSlice';
import { MultiService } from 'modules/api/MultiService';
import { web3Api } from 'store/queries';

interface GetStatsByRangeParams {
  jwtTokens: JwtManagerToken[];
  group?: string;
}

const duration = StatsByRangeDuration.TWO_DAYS;
const timeframe = StatsByRangeTimeframe.DAY;

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

export const {
  endpoints: { fetchStatsByRange },
  useLazyFetchStatsByRangeQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchStatsByRange: build.query<StatsByRangeResult, GetStatsByRangeParams>({
      queryFn: async ({ group, jwtTokens }) => {
        const service = MultiService.getService().getAccountingGateway();

        const promises = jwtTokens.map(({ userEndpointToken: token }) =>
          service.getUserStatsByRange({ duration, group, timeframe, token }),
        );

        const results = await Promise.allSettled(promises);

        const data = results.reduce<StatsByRangeResult>(
          (stats, result, index) => {
            stats[jwtTokens[index].userEndpointToken] = {
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
