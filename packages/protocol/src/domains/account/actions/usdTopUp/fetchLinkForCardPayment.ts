import { RequestAction, RequestsStore } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { MultiService } from 'modules/api/MultiService';
import { fetchPublicKey } from '../fetchPublicKey';
import { NotificationActions } from 'domains/notification/store/NotificationActions';
import { selectAuthData, setAuthData } from 'domains/auth/store/authSlice';
import { throwIfError } from '@ankr.com/common';

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
            const service = MultiService.getService();

            let encryptionPublicKey;

            const { hasWeb3Connection } = selectAuthData(store.getState());

            if (hasWeb3Connection) {
              const { data: publicKey } = throwIfError(
                await store.dispatchRequest(fetchPublicKey()),
              );

              encryptionPublicKey = publicKey;
            }

            const { url } = await service
              .getAccountGateway()
              .getLinkForCardPayment({
                amount,
                publicKey: encryptionPublicKey,
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
      onSuccess: async (
        response: any,
        _action: RequestAction,
        store: RequestsStore,
      ) => {
        store.dispatch(
          setAuthData({
            isCardPayment: true,
          }),
        );

        return response;
      },
    },
  }),
);
