import {
  IUsageEntity,
  IUserStatsResponse,
  PrivateStatsInterval,
  Web3Address,
} from 'multirpc-sdk';
import { web3Api } from 'store/queries/web3Api';
import { MultiService } from 'modules/api/MultiService';
import { authorizeBackoffice } from '../utils/authorizeBackoffice';

interface IApiRequestParams {
  address: Web3Address;
  interval?: PrivateStatsInterval;
}

export interface IUserEntityMapped extends IUsageEntity {
  totalCost?: number;
}

interface IApiResponse {
  stats?: IUserStatsResponse;
  usage?: IUserEntityMapped[];
}

export const {
  useFetchUserStatsQuery,
  endpoints: { fetchUserStats },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchUserStats: build.query<IApiResponse, IApiRequestParams>({
      queryFn: async ({ address, interval = PrivateStatsInterval.MONTH }) => {
        const service = await MultiService.getInstance();
        const backofficeGateway = await service.getBackofficeGateway();
        await authorizeBackoffice();
        const statsResponse = await backofficeGateway.getUserStats({
          address,
          interval,
          current: true, // set true if current day stats need to be included
        });

        const usage = statsResponse?.stats
          ? Object.values(statsResponse?.stats).map(i => {
              return {
                blockchain: i?.blockchain || '',
                totalCost: i?.total?.totalCost,
                details:
                  i?.total?.topRequests?.map(j => {
                    return {
                      blockchain: i?.blockchain || '',
                      ...j,
                      count: j.count.toString(),
                      totalCost: j?.totalCost?.toString(),
                    };
                  }) || [],
              };
            })
          : undefined;

        return {
          data: {
            stats: statsResponse,
            usage,
          },
        };
      },
    }),
  }),
});
