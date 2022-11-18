import { RequestAction, RequestsStore } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { IWeb3SendResult } from '@ankr.com/provider';

import { fetchBalance } from '../balance/fetchBalance';
import {
  selectTransaction,
  setWithdrawTransaction,
} from 'domains/account/store/accountWithdrawSlice';
import { t } from 'modules/i18n/utils/intl';
import { MultiService } from 'modules/api/MultiService';
import { waitForPendingTransaction } from './waitForPendingTransaction';
import { CONFIRMATION_BLOCKS } from 'multirpc-sdk';
import { timeout } from 'modules/common/utils/timeout';
import { ETH_BLOCK_TIME } from './const';
import { getReceipt } from '../topUp/waitTransactionConfirming';

const fetchCredentialsData = async (transactionHash: string) => {
  const service = await MultiService.getInstance();

  return service.canIssueJwtToken(transactionHash);
};

const waitForBlocks = async (transactionHash: string) => {
  let inProcess = true;

  while (inProcess) {
    try {
      // eslint-disable-next-line
      const data = await fetchCredentialsData(transactionHash);

      inProcess = !data?.isReady;
    } catch (_error) {
      // ignore if error
    }

    if (inProcess) {
      // eslint-disable-next-line
      await timeout(ETH_BLOCK_TIME);
    }
  }
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
          const service = await MultiService.getInstance();
          const provider = service.getKeyProvider();
          const { currentAccount: address } = service.getKeyProvider();

          const transaction = selectTransaction(store.getState(), address);

          const initialTransactionHash = transaction?.withdrawTransactionHash;

          if (!initialTransactionHash) {
            throw new Error(t('error.failed'));
          }

          // step 1: trying to take a receipt
          const receipt1 = await getReceipt(initialTransactionHash);

          if (receipt1) {
            return waitForBlocks(initialTransactionHash);
          }

          // step 2: there're no receipt. we should wait
          await waitForPendingTransaction();

          // step 3: trying to take a receipt again
          let transactionHash = initialTransactionHash;

          const receipt2 = await getReceipt(transactionHash);

          if (receipt2) {
            return waitForBlocks(transactionHash);
          }

          // step 4: we already haven't had pending transaction and a receipt too -> check the latest withdrawal transaction
          const lastWithdrawalEvent = await service.getLastProviderRequestEvent(
            address,
          );

          const currentBlockNumber = await provider
            .getWeb3()
            .eth.getBlockNumber();

          // step 5: check blocks difference. This is old top up transaction. New top up transaction is failed or cancelled
          if (
            currentBlockNumber - (lastWithdrawalEvent?.blockNumber || 0) >
            CONFIRMATION_BLOCKS
          ) {
            throw new Error(t('error.failed'));
          }

          if (
            lastWithdrawalEvent?.transactionHash &&
            lastWithdrawalEvent?.transactionHash !== initialTransactionHash
          ) {
            transactionHash = lastWithdrawalEvent.transactionHash;

            store.dispatch(
              setWithdrawTransaction({
                address,
                withdrawTransactionHash: transactionHash,
              }),
            );

            await getReceipt(transactionHash);
          }

          return waitForBlocks(transactionHash);
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
    hideNotificationOnError: true,
  },
}));
