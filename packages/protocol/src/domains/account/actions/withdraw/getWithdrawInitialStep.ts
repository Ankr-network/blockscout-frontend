import { RequestAction, RequestsStore } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { setWithdrawTransaction } from 'domains/account/store/accountWithdrawSlice';
import { MultiService } from 'modules/api/MultiService';
import { WithdrawStep } from './const';
import { waitTransactionConfirming } from './waitTransactionConfirming';
// eslint-disable-next-line import/no-cycle
import {
  checkWithdrawStatus,
  WIHDRAWAL_STATUS_INTERVAL,
} from './checkWithdrawStatus';
import { WithdrawStatus } from 'multirpc-sdk';
import { checkPendingWithdrawal } from './getInitialStep/checkPendingWithdrawal';

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

          await checkPendingWithdrawal();

          const address = service.getKeyProvider().currentAccount();

          const lastWithdrawalEvent = await service.getLastProviderRequestEvent(
            address,
          );

          if (!lastWithdrawalEvent) return WithdrawStep.start;

          const { transactionHash } = lastWithdrawalEvent;

          const transactionReceipt = await service.getTransactionReceipt(
            transactionHash,
          );

          if (!transactionReceipt || !transactionReceipt.status) {
            store.dispatchRequest(waitTransactionConfirming());

            store.dispatch(
              setWithdrawTransaction({
                address,
                withdrawTransactionHash: transactionHash,
              }),
            );

            return WithdrawStep.waitTransactionConfirming;
          }

          const { data } = await store.dispatchRequest(
            checkWithdrawStatus(transactionHash),
          );

          if (data === WithdrawStatus.WITHDRAW_STATUS_COMPLETED) {
            return WithdrawStep.start;
          }

          store.dispatch(
            setWithdrawTransaction({
              address,
              withdrawTransactionHash: transactionHash,
            }),
          );

          store.dispatchRequest(
            checkWithdrawStatus(transactionHash, WIHDRAWAL_STATUS_INTERVAL),
          );

          return WithdrawStep.done;
        })(),
      };
    },
  },
}));
