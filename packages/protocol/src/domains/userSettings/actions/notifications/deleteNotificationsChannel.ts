import { IDeleteNotificationsChannelParams } from 'multirpc-sdk';

import { RequestType, web3Api } from 'store/queries';
import { MultiService } from 'modules/api/MultiService';

export const {
  endpoints: { deleteNotificationsChannel },
  useDeleteNotificationsChannelMutation,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    deleteNotificationsChannel: build.mutation<
      string,
      IDeleteNotificationsChannelParams
    >({
      queryFn: async params => {
        const service = MultiService.getService();

        const { result } = await service
          .getAccountingGateway()
          .deleteNotificationsChannel(params);

        return { data: result };
      },
      invalidatesTags: [RequestType.TelegramNotifications],
    }),
  }),
  overrideExisting: true,
});
