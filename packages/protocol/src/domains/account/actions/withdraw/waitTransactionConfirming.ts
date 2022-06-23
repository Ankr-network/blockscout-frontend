import { RequestAction, RequestsStore } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { IWeb3SendResult } from '@ankr.com/stakefi-web3';

import { throwIfError } from 'common';
import { retry } from 'modules/api/utils/retry';
import { fetchCredentialsStatus } from 'domains/auth/actions/fetchCredentialsStatus';
import { fetchBalance } from '../balance/fetchBalance';
import { selectTransaction } from 'domains/account/store/accountWithdrawSlice';
import { t } from 'modules/i18n/utils/intl';
import { getTransactionReceipt } from './getTransactionReceipt';

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

const waitForBlocks = async (store: RequestsStore, transactionHash: string) => {
  await checkTransactionStatus(transactionHash);

  const credentialsStatus = await fetchCredentialsData(transactionHash, store);

  if (credentialsStatus?.isReady) return undefined;

  return retry(
    async () => {
      await checkTransactionStatus(transactionHash);

      const data = await fetchCredentialsData(transactionHash, store);

      if (!data?.isReady) {
        throw new Error(t('error.credentials'));
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
