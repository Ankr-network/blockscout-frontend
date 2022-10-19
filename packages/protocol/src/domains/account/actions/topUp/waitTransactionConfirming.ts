import { RequestAction, RequestsStore } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { IWeb3SendResult } from '@ankr.com/provider-core';

import { fetchTransactionConfirmationStatus } from './fetchTransactionConfirmationStatus';
import { fetchBalance } from '../balance/fetchBalance';
import {
  selectTransaction,
  setTopUpTransaction,
} from 'domains/account/store/accountTopUpSlice';
import { t } from 'modules/i18n/utils/intl';
import { MultiService } from 'modules/api/MultiService';
import { CONFIRMATION_BLOCKS } from 'multirpc-sdk';
import { waitForPendingTransaction } from '../withdraw/waitForPendingTransaction';
import { timeout } from 'modules/common/utils/timeout';
import { ETH_BLOCK_TIME } from '../withdraw/const';

const waitForBlocks = async (store: RequestsStore, transactionHash: string) => {
  let inProcess = true;

  while (inProcess) {
    // eslint-disable-next-line
    const { data } = await store.dispatchRequest(
      fetchTransactionConfirmationStatus(transactionHash),
    );

    inProcess = !data?.isReady;

    if (inProcess) {
      // eslint-disable-next-line
      await timeout(ETH_BLOCK_TIME);
    }
  }
};

export const getReceipt = async (transactionHash: string) => {
  const service = await MultiService.getInstance();

  const receipt = await service.getTransactionReceipt(transactionHash);

  if (receipt && !receipt.status) {
    throw new Error(t('error.failed'));
  }

  return receipt;
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
          const service = await MultiService.getInstance();
          const provider = service.getKeyProvider();
          const { currentAccount: address } = service.getKeyProvider();

          const transaction = selectTransaction(store.getState(), address);

          const initialTransactionHash = transaction?.topUpTransactionHash;

          if (!initialTransactionHash) {
            throw new Error(t('error.failed'));
          }

          // step 1: trying to take a receipt
          const receipt1 = await getReceipt(initialTransactionHash);

          if (receipt1) {
            return waitForBlocks(store, initialTransactionHash);
          }

          // step 2: there're no receipt. we should wait
          await waitForPendingTransaction();

          // step 3: trying to take a receipt again
          let transactionHash = initialTransactionHash;

          const receipt2 = await getReceipt(transactionHash);

          if (receipt2) {
            return waitForBlocks(store, transactionHash);
          }

          // step 4: we already haven't had pending transaction and a receipt too -> check the latest top up transaction
          const lastTopUpEvent = await service.getLastLockedFundsEvent(address);

          const currentBlockNumber = await provider
            .getWeb3()
            .eth.getBlockNumber();

          // step 5: check blocks difference. This is old top up transaction. New top up transaction is failed or cancelled
          if (
            currentBlockNumber - (lastTopUpEvent?.blockNumber || 0) >
            CONFIRMATION_BLOCKS
          ) {
            throw new Error(t('error.failed'));
          }

          if (
            lastTopUpEvent?.transactionHash &&
            lastTopUpEvent?.transactionHash !== initialTransactionHash
          ) {
            transactionHash = lastTopUpEvent.transactionHash;

            store.dispatch(
              setTopUpTransaction({
                address,
                topUpTransactionHash: transactionHash,
              }),
            );

            await getReceipt(transactionHash);
          }

          return waitForBlocks(store, transactionHash);
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
