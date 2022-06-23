import { RequestAction, RequestsStore } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { selectAccount } from 'domains/account/store/accountWithdrawSlice';
import { MultiService } from 'modules/api/MultiService';
import { WithdrawStep } from './const';
import { waitTransactionConfirming } from './waitTransactionConfirming';
import { getTransactionReceipt } from './getTransactionReceipt';
// eslint-disable-next-line import/no-cycle
import {
  checkWithdrawStatus,
  WIHDRAWAL_STATUS_INTERVAL,
} from './checkWithdrawStatus';

export const getWithdrawInitialStep = createSmartAction<
  RequestAction<null, WithdrawStep>
>('withdraw/getWithdrawInitialStep', () => ({
  request: {
    promise: (async () => null)(),
  },
  meta: {
    onRequest: (request: any, action: RequestAction, store: RequestsStore) => {
      return {
        promise: (async (): Promise<any> => {
          const { service } = MultiService.getInstance();

          const address = service.getKeyProvider().currentAccount();
          const transaction = selectAccount(store.getState(), address);

          const withdrawTransactionHash = transaction?.withdrawTransactionHash;

          if (!withdrawTransactionHash) {
            return WithdrawStep.start;
          }

          await store.dispatchRequest(
            checkWithdrawStatus(withdrawTransactionHash),
          );

          // It will return null for pending transactions and an object if the transaction is successful.
          const transactionReceipt = await getTransactionReceipt(
            withdrawTransactionHash,
          );

          if (!transactionReceipt || !transactionReceipt.status) {
            store.dispatchRequest(waitTransactionConfirming());

            return WithdrawStep.waitTransactionConfirming;
          }

          store.dispatchRequest(
            checkWithdrawStatus(
              withdrawTransactionHash,
              WIHDRAWAL_STATUS_INTERVAL,
            ),
          );

          return WithdrawStep.done;
        })(),
      };
    },
  },
}));
