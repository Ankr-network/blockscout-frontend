import { INotificationsSettings } from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';
import { NotificationActions } from 'domains/notification/store/NotificationActions';
import { t } from 'modules/i18n/utils/intl';
import { web3Api } from 'store/queries';

export const {
  useLazyUserSettingsEditNotificationSettingsQuery,
  endpoints: { userSettingsEditNotificationSettings },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    userSettingsEditNotificationSettings: build.query<
      INotificationsSettings,
      INotificationsSettings
    >({
      queryFn: async settings => {
        const service = MultiService.getService();

        const data = await service
          .getAccountGateway()
          .editNotificationSettings(settings);

        return { data };
      },
      onQueryStarted: async (_args, { dispatch, queryFulfilled }) => {
        await queryFulfilled;

        dispatch(
          NotificationActions.showNotification({
            message: t('user-settings.notifications.success'),
            severity: 'success',
          }),
        );
      },
    }),
  }),
});
