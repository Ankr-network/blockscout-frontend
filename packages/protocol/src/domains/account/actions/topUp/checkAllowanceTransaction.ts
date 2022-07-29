import { RequestAction } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { TransactionReceipt } from 'web3-core';

import { CONFIRMATION_BLOCKS } from 'multirpc-sdk';
import { MultiService } from 'modules/api/MultiService';
import { t } from 'modules/i18n/utils/intl';
import { waitPendingTransaction } from '../withdraw/getInitialStep/waitPendingTransaction';

export const checkAllowanceTransaction = createSmartAction<
  RequestAction<TransactionReceipt, TransactionReceipt>
>('topUp/checkAllowanceTransaction', (initialTransactionHash: string) => ({
  request: {
    promise: (async () => null)(),
  },
  meta: {
    onRequest: () => {
      return {
        promise: (async (): Promise<TransactionReceipt> => {
          // step 1: trying to take the receipt
          const service = await MultiService.getInstance();
          const provider = service.getKeyProvider();
          const { currentAccount: address } = provider;

          const transactionReceipt = await service.getTransactionReceipt(
            initialTransactionHash,
          );

          if (transactionReceipt) return transactionReceipt;

          // step 2: waiting for the pending transaction
          await waitPendingTransaction();

          // step 3: trying to take the receipt again
          let transactionHash = initialTransactionHash;

          const receipt = await service.getTransactionReceipt(transactionHash);

          if (receipt) return receipt;

          // step 4: we already haven't had pending transaction and receipt too -> check the latest allowance transaction
          const lastAllowanceEvent = await service.getLatestAllowanceEvent(
            address,
          );

          const currentBlockNumber = await provider
            .getWeb3()
            .eth.getBlockNumber();

          // This is old allowance transaction. New allowance transaction is failed
          if (
            currentBlockNumber - (lastAllowanceEvent?.blockNumber || 0) >
            CONFIRMATION_BLOCKS * 2
          ) {
            throw new Error(t('error.failed'));
          }

          // step 5: use the latest allowance transaction from the blockchain
          if (
            lastAllowanceEvent?.transactionHash &&
            lastAllowanceEvent?.transactionHash !== initialTransactionHash
          ) {
            transactionHash = lastAllowanceEvent.transactionHash;
          }

          return service.getTransactionReceipt(transactionHash);
        })(),
      };
    },
  },
}));
