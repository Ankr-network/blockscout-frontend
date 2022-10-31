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
  current?: boolean;
}

export interface IUsageEntityMapped extends IUsageEntity {
  totalCost?: number;
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
      queryFn: async ({
        address,
        interval = PrivateStatsInterval.MONTH,
        current = false,
      }) => {
        const service = await MultiService.getInstance();
        const backofficeGateway = await service.getBackofficeGateway();
        await authorizeBackoffice();
        const statsResponse = await backofficeGateway.getUserStats({
          address,
          interval,
          current, // current = true means current day stats will be included to period stats response
        });

        const usage = statsResponse?.stats
          ? Object.values(statsResponse?.stats).map(stat => {
              return {
                blockchain: stat?.blockchain || '',
                totalCost: stat?.total?.totalCost || 0,
                details:
                  stat?.total?.topRequests?.map(topRequests => {
                    return {
                      blockchain: stat?.blockchain || '',
                      ...topRequests,
                      count: topRequests.count.toString(),
                      totalCost: topRequests?.totalCost?.toString() || '0',
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
  overrideExisting: true,
});
