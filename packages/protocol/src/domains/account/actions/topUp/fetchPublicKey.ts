import { RequestAction, RequestsStore } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { throwIfError } from 'common';
import { fetchEncryptionKey } from 'modules/auth/actions/fetchEncryptionKey';
import { walletConnectionGuard } from 'modules/auth/utils/walletConnectionGuard';
import { selectAuthData, setAuthData } from 'modules/auth/store/authSlice';

export const fetchPublicKey = createSmartAction<RequestAction<string, string>>(
  'topUp/fetchPublicKey',
  () => ({
    request: {
      promise: async (store: RequestsStore) => {
        let { encryptionPublicKey } = selectAuthData(store.getState());

        if (!encryptionPublicKey) {
          const {
            data: { key: publicKey },
          } = throwIfError(await store.dispatchRequest(fetchEncryptionKey()));

          store.dispatch(setAuthData({ encryptionPublicKey: publicKey }));

          encryptionPublicKey = publicKey;
        }

        return encryptionPublicKey;
      },
    },
    meta: {
      onRequest: walletConnectionGuard,
      asMutation: false,
    },
  }),
);
