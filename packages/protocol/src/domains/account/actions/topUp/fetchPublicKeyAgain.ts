import { RequestAction, RequestsStore } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { throwIfError } from 'common';
import { fetchEncryptionKey } from 'modules/auth/actions/fetchEncryptionKey';
import { walletConnectionGuard } from 'modules/auth/utils/walletConnectionGuard';

export const fetchPublicKeyAgain = createSmartAction<
  RequestAction<string, string>
>('topUp/fetchPublicKeyAgain', () => ({
  request: {
    promise: async (store: RequestsStore) => {
      const {
        data: { key },
      } = throwIfError(await store.dispatchRequest(fetchEncryptionKey()));

      return key;
    },
  },
  meta: {
    onRequest: walletConnectionGuard,
    asMutation: false,
  },
}));
