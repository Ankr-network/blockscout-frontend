import { IGetTelegramNotificationsBotDataResponse } from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';
import { web3Api } from 'store/queries';

export const {
  endpoints: { fetchTelegramNotificationsBotData },
  useLazyFetchTelegramNotificationsBotDataQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchTelegramNotificationsBotData: build.query<
      IGetTelegramNotificationsBotDataResponse,
      void
    >({
      queryFn: async () => {
        const service = MultiService.getService();

        const data = await service
          .getAccountingGateway()
          .getTelegramNotificationsBotData();

        return { data };
      },
    }),
  }),
});
