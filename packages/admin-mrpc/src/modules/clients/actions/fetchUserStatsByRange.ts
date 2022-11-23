import { IStatsTimeframe, IUserStatsResponse, Web3Address } from 'multirpc-sdk';
import { Milliseconds } from '@ankr.com/utils';
import { web3Api } from 'store/queries/web3Api';
import { MultiService } from 'modules/api/MultiService';
import { authorizeBackoffice } from '../utils/authorizeBackoffice';
import { mapStatsToUsage } from '../utils/mapStatsToUsage';
import { IUsageEntityMapped } from '../types';

interface IApiRequestParams {
  address: Web3Address;
  timeframe?: IStatsTimeframe;
  from: Milliseconds;
  to: Milliseconds;
}

interface IApiResponse {
  stats?: IUserStatsResponse;
  usage?: IUsageEntityMapped[];
}

export const {
  useFetchUserStatsByRangeQuery,
  endpoints: { fetchUserStatsByRange },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchUserStatsByRange: build.query<IApiResponse, IApiRequestParams>({
      queryFn: async ({
        address,
        from,
        to,
        timeframe = 'd1', // timeframe param is used for counts points range
      }) => {
        if (!from || !to) {
          return {
            data: {
              stats: undefined,
              usage: undefined,
            },
          };
        }
        const service = await MultiService.getInstance();
        const backofficeGateway = await service.getBackofficeGateway();
        await authorizeBackoffice();
        const statsResponse = await backofficeGateway.getUserStatsByRange({
          address,
          from,
          to,
          timeframe,
        });

        return {
          data: {
            stats: statsResponse,
            usage: mapStatsToUsage(statsResponse),
          },
        };
      },
    }),
  }),
  overrideExisting: true,
});
