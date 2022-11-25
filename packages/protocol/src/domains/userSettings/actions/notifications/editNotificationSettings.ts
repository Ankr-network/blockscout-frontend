import { RequestAction, RequestsStore } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { MultiService } from 'modules/api/MultiService';
import { INotificationsSettings } from 'multirpc-sdk';
import { NotificationActions } from 'domains/notification/store/NotificationActions';
import { t } from 'modules/i18n/utils/intl';

export const editNotificationSettings = createSmartAction<
  RequestAction<INotificationsSettings, INotificationsSettings>
>(
  'userSettings/editNotificationSettings',
  (settings: INotificationsSettings) => ({
    request: {
      promise: (async () => null)(),
    },
    meta: {
      onRequest: () => {
        return {
          promise: (async (): Promise<INotificationsSettings> => {
            const service = MultiService.getService();

            const data = await service
              .getAccountGateway()
              .editNotificationSettings(settings);

            return data;
          })(),
        };
      },
      onSuccess: (
        response: any,
        _action: RequestAction,
        store: RequestsStore,
      ) => {
        store.dispatch(
          NotificationActions.showNotification({
            message: t('user-settings.notifications.success'),
            severity: 'success',
          }),
        );

        return response;
      },
    },
  }),
);
