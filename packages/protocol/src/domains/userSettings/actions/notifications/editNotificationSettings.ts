import {
  INotificationsChannelConfig,
  IUpdateNotificationsChannelParams,
} from 'multirpc-sdk';
import { t } from '@ankr.com/common';

import { MultiService } from 'modules/api/MultiService';
import { NotificationActions } from 'domains/notification/store/NotificationActions';
import { RootState } from 'store';
import {
  selectSignupSettings,
  setSignupSettings,
} from 'domains/userSettings/store/userSettingsSlice';
import { web3Api } from 'store/queries';

export const {
  endpoints: { userSettingsEditNotificationSettings },
  useLazyUserSettingsEditNotificationSettingsQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    userSettingsEditNotificationSettings: build.query<
      INotificationsChannelConfig,
      IUpdateNotificationsChannelParams
    >({
      queryFn: async (settings, { dispatch, getState }) => {
        const service = MultiService.getService();

        const data = await service
          .getAccountingGateway()
          .updateNotificationsChannel(settings);

        const signUpSettings = selectSignupSettings(getState() as RootState);

        dispatch(
          setSignupSettings({
            ...signUpSettings,
            hasMarketing: data?.marketing,
          }),
        );

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
