import { IWebsocketStatsRequest, IWebsocketStatsResponse } from 'multirpc-sdk';

import { web3Api } from 'store/queries/web3Api';
import { MultiService } from 'modules/api/MultiService';

export const {
  useFetchWebsocketStatsQuery,
  useLazyFetchWebsocketStatsQuery,
  endpoints: { fetchWebsocketStats },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchWebsocketStats: build.query<
      IWebsocketStatsResponse,
      IWebsocketStatsRequest
    >({
      queryFn: async ({ blockchain }) => {
        const service = await MultiService.getWeb3Service();
        const stats = await service
          .getBackofficeGateway()
          .getWebsocketStats({ blockchain });

        return {
          data: stats,
        };
      },
    }),
  }),
  overrideExisting: true,
});
