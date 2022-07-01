import {
  RequestAction,
  RequestsStore,
  resetRequests,
} from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { sendAllowance } from './sendAllowance';
import { fetchPublicKey } from '../fetchPublicKey';
import { deposit } from './deposit';
import { waitTransactionConfirming } from './waitTransactionConfirming';
import { login } from './login';
// eslint-disable-next-line import/no-cycle
import { getInitialStep } from './getInitialStep/getInitialStep';
import { getLastLockedFundsEvent } from './getLastLockedFundsEvent';
import { checkAllowanceTransaction } from './checkAllowanceTransaction';

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
                getInitialStep.toString(),
                sendAllowance.toString(),
                fetchPublicKey.toString(),
                deposit.toString(),
                waitTransactionConfirming.toString(),
                login.toString(),
                getLastLockedFundsEvent.toString(),
                checkAllowanceTransaction.toString(),
              ]),
            );
          })(),
        };
      },
      asMutation: false,
    },
  }),
);
