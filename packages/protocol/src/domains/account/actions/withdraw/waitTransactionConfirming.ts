import { RequestAction, RequestsStore } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { IWeb3SendResult } from '@ankr.com/stakefi-web3';

import { throwIfError } from 'common';
import { retry } from 'modules/api/utils/retry';
import { fetchCredentialsStatus } from 'domains/auth/actions/fetchCredentialsStatus';
import { fetchBalance } from '../balance/fetchBalance';
import {
  selectTransaction,
  setWithdrawTransaction,
} from 'domains/account/store/accountWithdrawSlice';
import { t } from 'modules/i18n/utils/intl';
import { getTransactionReceipt } from './getTransactionReceipt';
import { MultiService } from 'modules/api/MultiService';
import { checkPendingWithdrawal } from './getInitialStep/checkPendingWithdrawal';
import { CONFIRMATION_BLOCKS } from 'multirpc-sdk';

const MAX_ATTEMPTS = 50;

const checkTransactionStatus = async (transactionHash: string) => {
  const transactionReceipt = await getTransactionReceipt(transactionHash);

  if (transactionReceipt && !transactionReceipt?.status) {
    throw new Error(t('error.failed'));
  }
};

const fetchCredentialsData = async (
  transactionHash: string,
  store: RequestsStore,
) => {
  const { data: credentialsData } = throwIfError(
    await store.dispatchRequest(fetchCredentialsStatus(transactionHash)),
  );

  return credentialsData;
};

const waitForBlocks = async (
  store: RequestsStore,
  initialTransactionHash: string,
) => {
  await checkTransactionStatus(initialTransactionHash);

  const credentialsStatus = await fetchCredentialsData(
    initialTransactionHash,
    store,
  );

  if (credentialsStatus?.isReady) return undefined;

  return retry(
    async () => {
      await checkPendingWithdrawal();

      const { service } = MultiService.getInstance();
      const address = service.getKeyProvider().currentAccount();
      const lastWithdrawalEvent = await service.getLastProviderRequestEvent(
        address,
      );

      const currentBlockNumber = await service
        .getKeyProvider()
        .getWeb3()
        .eth.getBlockNumber();

      // This is old withdrawal. New withdrawal failed
      if (
        currentBlockNumber - (lastWithdrawalEvent?.blockNumber || 0) >
        CONFIRMATION_BLOCKS
      ) {
        throw new Error(t('error.failed'));
      }

      let newTransactionHash = initialTransactionHash;

      if (
        lastWithdrawalEvent?.transactionHash &&
        lastWithdrawalEvent?.transactionHash !== initialTransactionHash
      ) {
        newTransactionHash = lastWithdrawalEvent?.transactionHash as string;

        store.dispatch(
          setWithdrawTransaction({
            address,
            withdrawTransactionHash: newTransactionHash,
          }),
        );
      }

      await checkTransactionStatus(newTransactionHash);

      const data = await fetchCredentialsData(newTransactionHash, store);

      if (!data?.isReady) {
        throw new Error();
      }

      return data;
    },
    () => false,
    MAX_ATTEMPTS,
  );
};

export const waitTransactionConfirming = createSmartAction<
  RequestAction<IWeb3SendResult, null>
>('withdraw/waitTransactionConfirming', () => ({
  request: {
    promise: (async () => null)(),
  },
  meta: {
    onRequest: (request: any, action: RequestAction, store: RequestsStore) => {
      return {
        promise: (async () => {
          const transaction = selectTransaction(store.getState());

          if (transaction?.withdrawTransactionHash) {
            await waitForBlocks(store, transaction.withdrawTransactionHash);
          }
        })(),
      };
    },
    onSuccess: async (
      response: any,
      _action: RequestAction,
      store: RequestsStore,
    ) => {
      store.dispatchRequest(fetchBalance());

      return response;
    },
    showNotificationOnError: false,
  },
}));
