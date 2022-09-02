import { RequestAction, RequestsStore } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { MultiService } from 'modules/api/MultiService';
import { fetchPublicKey } from '../fetchPublicKey';
import { NotificationActions } from 'domains/notification/store/NotificationActions';

export const fetchLinkForCardPayment = createSmartAction<RequestAction<string>>(
  'usdTopUp/fetchLinkForCardPayment',
  (amount: string) => ({
    request: {
      promise: (async () => null)(),
    },
    meta: {
      onRequest: (
        request: any,
        action: RequestAction,
        store: RequestsStore,
      ) => {
        return {
          promise: (async (): Promise<any> => {
            const service = await MultiService.getInstance();

            const { data: publicKey } = await store.dispatchRequest(
              fetchPublicKey(),
            );

            const { url } = await service
              .getAccountGateway()
              .getLinkForCardPayment({
                amount,
                publicKey: publicKey as string,
              });

            return url;
          })(),
        };
      },
      hideNotificationOnError: true,
      onError: (error, _action: RequestAction, store: RequestsStore) => {
        const errorMessage = error?.response?.data?.error;

        if (errorMessage) {
          store.dispatch(
            NotificationActions.showNotification({
              message: errorMessage,
              severity: 'error',
            }),
          );
        }

        throw error;
      },
    },
  }),
);
