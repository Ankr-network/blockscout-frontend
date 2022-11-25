import { RequestAction } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { MultiService } from 'modules/api/MultiService';
import { INotificationsSettings } from 'multirpc-sdk';

export const fetchNotificationSettings = createSmartAction<
  RequestAction<INotificationsSettings, INotificationsSettings>
>('userSettings/fetchNotificationSettings', () => ({
  request: {
    promise: (async () => null)(),
  },
  meta: {
    onRequest: () => {
      return {
        promise: (async (): Promise<INotificationsSettings> => {
          const service = await MultiService.getService();

          const data = await service
            .getAccountGateway()
            .getNotificationSettings();

          return data;
        })(),
      };
    },
  },
}));
