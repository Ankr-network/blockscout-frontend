import {
  IApiUserGroupParams,
  PrivateStatsInterval,
  Top10StatsResponse,
} from 'multirpc-sdk';

import { getAccountingGateway } from 'modules/api/MultiService';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { web3Api } from 'store/queries';

import { Gateway } from '../types';

type Top10StatsRequest = Gateway &
  IApiUserGroupParams & {
    blockchain?: string;
    intervalType: PrivateStatsInterval;
  };

const emptyResponse: Top10StatsResponse = { countries: [], ips: [] };

export const {
  endpoints: { fetchTop10Stats },
  useLazyFetchTop10StatsQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchTop10Stats: build.query<Top10StatsResponse, Top10StatsRequest>({
      queryFn: createNotifyingQueryFn(
        async ({
          blockchain,
          gateway = getAccountingGateway(),
          group,
          intervalType,
        }) => {
          /* backend does not support h1 and h24 interval for this endpoint */
          if (
            intervalType !== PrivateStatsInterval.WEEK &&
            intervalType !== PrivateStatsInterval.MONTH
          ) {
            return { data: emptyResponse };
          }

          const data = await gateway.getTop10Stats({
            intervalType,
            blockchain,
            group,
          });

          return { data };
        },
      ),
    }),
  }),
  overrideExisting: true,
});
