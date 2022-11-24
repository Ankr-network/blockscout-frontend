import {
  IUserStatsResponse,
  PrivateStatsInterval,
  Web3Address,
} from 'multirpc-sdk';
import { web3Api } from 'store/queries/web3Api';
import { MultiService } from 'modules/api/MultiService';
import { authorizeBackoffice } from '../utils/authorizeBackoffice';
import { mapStatsToUsage } from '../utils/mapStatsToUsage';
import { IUsageEntityMapped } from '../types';

interface IApiRequestParams {
  address: Web3Address;
  interval?: PrivateStatsInterval;
  current?: boolean;
}

interface IApiResponse {
  stats?: IUserStatsResponse;
  usage?: IUsageEntityMapped[];
}

export const {
  useFetchUserStatsQuery,
  endpoints: { fetchUserStats },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchUserStats: build.query<IApiResponse, IApiRequestParams>({
      queryFn: async ({ address, interval, current = false }) => {
        if (!interval) {
          return {
            data: {
              stats: undefined,
              usage: undefined,
            },
          };
        }
        const service = await MultiService.getWeb3Service();
        const backofficeGateway = await service.getBackofficeGateway();
        await authorizeBackoffice();
        const statsResponse = await backofficeGateway.getUserStats({
          address,
          interval,
          current, // current = true means current day stats will be included to period stats response
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
