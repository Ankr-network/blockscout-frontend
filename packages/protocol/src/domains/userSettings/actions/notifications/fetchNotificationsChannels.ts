import {
  IGetNotificationsChannelsParams,
  IGetNotificationsChannelsResponse,
} from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';
import { RequestType, web3Api } from 'store/queries';

export const {
  endpoints: { fetchNotificationsChannels },
  useFetchNotificationsChannelsQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchNotificationsChannels: build.query<
      IGetNotificationsChannelsResponse[],
      IGetNotificationsChannelsParams | void
    >({
      queryFn: async params => {
        const service = MultiService.getService();

        const data = await service
          .getAccountingGateway()
          .getNotificationsChannels(params ?? undefined);

        return { data };
      },
      providesTags: [RequestType.TelegramNotifications],
    }),
  }),
});
