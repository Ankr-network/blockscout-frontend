import { RequestAction, RequestsStore } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { throwIfError } from 'common';
import { fetchEncryptionKey } from 'domains/auth/actions/fetchEncryptionKey';
import { selectAuthData, setAuthData } from 'domains/auth/store/authSlice';

export const fetchPublicKey = createSmartAction<RequestAction<string, string>>(
  'topUp/fetchPublicKey',
  () => ({
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
            let { encryptionPublicKey } = selectAuthData(store.getState());

            if (!encryptionPublicKey) {
              const {
                data: { key: publicKey },
              } = throwIfError(
                await store.dispatchRequest(fetchEncryptionKey()),
              );

              store.dispatch(setAuthData({ encryptionPublicKey: publicKey }));

              encryptionPublicKey = publicKey;
            }

            return encryptionPublicKey;
          })(),
        };
      },
    },
  }),
);
