import {
  RequestAction,
  RequestsStore,
  resetRequests,
} from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { walletConnectionGuard } from 'modules/auth/utils/walletConnectionGuard';
import { getAllowance } from './getAllowance';
import { fetchPublicKey } from './fetchPublicKey';
import { deposit } from './deposit';
import { waitTransactionConfirming } from './waitTransactionConfirming';
import { login } from './login';
import { getTopUpInitialStep } from './getTopUpInitialStep';

export const reset = createSmartAction<RequestAction<string, string>>(
  'topUp/reset',
  () => ({
    request: {
      promise: async (store: RequestsStore) => {
        store.dispatch(
          resetRequests([
            getTopUpInitialStep.toString(),
            getAllowance.toString(),
            fetchPublicKey.toString(),
            deposit.toString(),
            waitTransactionConfirming.toString(),
            login.toString(),
          ]),
        );
      },
    },
    meta: {
      onRequest: walletConnectionGuard,
      asMutation: false,
    },
  }),
);
