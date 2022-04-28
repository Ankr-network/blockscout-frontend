import { RequestAction, RequestsStore } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { IWeb3SendResult } from '@ankr.com/stakefi-web3';

import { throwIfError } from 'common';
import { walletConnectionGuard } from 'modules/auth/utils/walletConnectionGuard';
import { retry } from 'modules/api/utils/retry';
import { fetchCredentialsStatus } from 'modules/auth/actions/fetchCredentialsStatus';
import { fetchBalances } from '../balance/fetchBalances';
import { selectAccount } from 'domains/account/store/accountSlice';
import { t } from 'modules/i18n/utils/intl';
// eslint-disable-next-line import/no-cycle
import { getTopUpInitialStep } from './getTopUpInitialStep';
import { redirectIfCredentials } from './redirectIfCredentials';

const MAX_ATTEMPTS = 50;

async function waitForBlocks(store: RequestsStore, transactionHash: string) {
  const { data: credentialsData } = await store.dispatchRequest(
    fetchCredentialsStatus(transactionHash),
  );

  if (credentialsData?.isReady) {
    return undefined;
  }

  return retry(
    async () => {
      const { data } = throwIfError(
        await store.dispatchRequest(fetchCredentialsStatus(transactionHash)),
      );

      const { isReady } = data;

      if (!isReady) {
        throw new Error(t('error.credentials'));
      }

      return data;
    },
    () => false,
    MAX_ATTEMPTS,
  );
}

export const waitTransactionConfirming = createSmartAction<
  RequestAction<IWeb3SendResult, null>
>('topUp/waitTransactionConfirming', () => ({
  request: {
    promise: async (store: RequestsStore) => {
      const { topUpTransaction } = selectAccount(store.getState());

      if (topUpTransaction?.transactionHash) {
        await waitForBlocks(store, topUpTransaction.transactionHash);
      }
    },
  },
  meta: {
    onRequest: walletConnectionGuard,
    asMutation: false,
    onSuccess: async (
      response: any,
      _action: RequestAction,
      store: RequestsStore,
    ) => {
      store.dispatchRequest(fetchBalances());

      const { data: hasCredentials } = await store.dispatchRequest(
        redirectIfCredentials(),
      );

      if (!hasCredentials) {
        await store.dispatchRequest(getTopUpInitialStep());
      }

      return response;
    },
  },
}));
