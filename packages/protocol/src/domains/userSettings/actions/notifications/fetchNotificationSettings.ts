import { IGetNotificationsChannelsResponse } from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';
import { web3Api } from 'store/queries';

export const {
  endpoints: { userSettingsFetchNotificationSettings },
  useLazyUserSettingsFetchNotificationSettingsQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    userSettingsFetchNotificationSettings: build.query<
      IGetNotificationsChannelsResponse[],
      void
    >({
      queryFn: async () => {
        const service = MultiService.getService();

        const data = await service
          .getAccountingGateway()
          .getNotificationsChannels();

        return { data };
      },
    }),
  }),
});
