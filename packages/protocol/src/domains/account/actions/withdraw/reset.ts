import {
  RequestAction,
  RequestsStore,
  resetRequests,
} from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';

// eslint-disable-next-line import/no-cycle
import { getWithdrawInitialStep } from './getWithdrawInitialStep';
import { withdraw } from './withdraw';
import { waitTransactionConfirming } from './waitTransactionConfirming';
// eslint-disable-next-line import/no-cycle
import { checkWithdrawStatus } from './checkWithdrawStatus';

export const reset = createSmartAction<RequestAction<string, string>>(
  'withdraw/reset',
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
                getWithdrawInitialStep.toString(),
                withdraw.toString(),
                waitTransactionConfirming.toString(),
                checkWithdrawStatus.toString(),
              ]),
            );
          })(),
        };
      },
    },
  }),
);
