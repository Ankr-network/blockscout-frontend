import { RequestAction, RequestsStore } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { IWeb3SendResult } from '@ankr.com/stakefi-web3';

import { throwIfError } from 'common';
import { retry } from 'modules/api/utils/retry';
import { fetchCredentialsStatus } from 'domains/auth/actions/fetchCredentialsStatus';
import { fetchBalance } from '../balance/fetchBalance';
import {
  selectTransaction,
  setTopUpTransaction,
} from 'domains/account/store/accountTopUpSlice';
import { t } from 'modules/i18n/utils/intl';
import { MultiService } from 'modules/api/MultiService';
import { CONFIRMATION_BLOCKS } from 'multirpc-sdk';
import { checkPendingTransaction } from '../withdraw/getInitialStep/checkPendingTransaction';

const MAX_ATTEMPTS = 50;

const waitForBlocks = async (
  store: RequestsStore,
  initialTransactionHash: string,
) => {
  const { data: credentialsData } = await store.dispatchRequest(
    fetchCredentialsStatus(initialTransactionHash),
  );

  if (credentialsData?.isReady) {
    return undefined;
  }

  return retry(
    async () => {
      await checkPendingTransaction();

      const { service } = MultiService.getInstance();
      const address = service.getKeyProvider().currentAccount();
      const lastTopUpEvent = await service.getLastLockedFundsEvent(address);

      const currentBlockNumber = await service
        .getKeyProvider()
        .getWeb3()
        .eth.getBlockNumber();

      // This is old topUp. New topUp failed
      if (
        currentBlockNumber - (lastTopUpEvent?.blockNumber || 0) >
        CONFIRMATION_BLOCKS * 3
      ) {
        throw new Error(t('error.failed'));
      }

      let newTransactionHash = initialTransactionHash;

      if (
        lastTopUpEvent?.transactionHash &&
        lastTopUpEvent?.transactionHash !== initialTransactionHash
      ) {
        newTransactionHash = lastTopUpEvent?.transactionHash as string;

        store.dispatch(
          setTopUpTransaction({
            address,
            topUpTransactionHash: newTransactionHash,
          }),
        );
      }

      const { data } = throwIfError(
        await store.dispatchRequest(fetchCredentialsStatus(newTransactionHash)),
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
};

export const waitTransactionConfirming = createSmartAction<
  RequestAction<IWeb3SendResult, null>
>('topUp/waitTransactionConfirming', () => ({
  request: {
    promise: (async () => null)(),
  },
  meta: {
    onRequest: (request: any, action: RequestAction, store: RequestsStore) => {
      return {
        promise: (async () => {
          const transaction = selectTransaction(store.getState());

          if (transaction?.topUpTransactionHash) {
            await waitForBlocks(store, transaction.topUpTransactionHash);
          }
        })(),
      };
    },
    asMutation: false,
    onSuccess: async (
      response: any,
      _action: RequestAction,
      store: RequestsStore,
    ) => {
      store.dispatchRequest(fetchBalance());

      return response;
    },
  },
}));
