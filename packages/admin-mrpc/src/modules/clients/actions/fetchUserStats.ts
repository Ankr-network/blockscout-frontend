import {
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

export const {
  useFetchUserStatsQuery,
  endpoints: { fetchUserStats },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchUserStats: build.query<IUserStatsResponse, IApiRequestParams>({
      queryFn: async ({ address, interval = PrivateStatsInterval.MONTH }) => {
        const service = await MultiService.getInstance();
        const backofficeGateway = await service.getBackofficeGateway();
        await authorizeBackoffice();
        const stats = await backofficeGateway.getUserStats({
          address,
          interval,
        });

        return {
          data: stats,
        };
      },
    }),
  }),
});
