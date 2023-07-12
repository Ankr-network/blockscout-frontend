import {
  PrivateStatsInterval,
  Top10StatsParams,
  Top10StatsResponse,
} from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { web3Api } from 'store/queries';

type Top10StatsRequest = Omit<Top10StatsParams, 'intervalType'> & {
  intervalType: PrivateStatsInterval;
};

const emptyResponse: Top10StatsResponse = { countries: [], ips: [] };

export const {
  endpoints: { fetchTop10Stats },
  useLazyFetchTop10StatsQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchTop10Stats: build.query<Top10StatsResponse, Top10StatsRequest>({
      queryFn: createNotifyingQueryFn(async params => {
        const api = MultiService.getService().getAccountGateway();

        /* backend does not support h1 and h24 interval for this endpoint */
        if (
          params.intervalType === PrivateStatsInterval.HOUR ||
          params.intervalType === PrivateStatsInterval.DAY
        ) {
          return { data: emptyResponse };
        }

        const data = await api.getTop10Stats(params as Top10StatsParams);

        return { data };
      }),
    }),
  }),
  overrideExisting: true,
});
