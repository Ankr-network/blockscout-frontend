import {
  RequestAction,
  RequestsStore,
  resetRequests,
} from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { getAllowance } from './getAllowance';
import { fetchPublicKey } from '../fetchPublicKey';
import { deposit } from './deposit';
import { waitTransactionConfirming } from './waitTransactionConfirming';
import { login } from './login';
import { getTopUpInitialStep } from './getTopUpInitialStep';
import { getLastLockedFundsEvent } from './getLastLockedFundsEvent';

export const reset = createSmartAction<RequestAction<string, string>>(
  'topUp/reset',
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
          promise: (async () => {
            store.dispatch(
              resetRequests([
                getTopUpInitialStep.toString(),
                getAllowance.toString(),
                fetchPublicKey.toString(),
                deposit.toString(),
                waitTransactionConfirming.toString(),
                login.toString(),
                getLastLockedFundsEvent.toString(),
              ]),
            );
          })(),
        };
      },
      asMutation: false,
    },
  }),
);
