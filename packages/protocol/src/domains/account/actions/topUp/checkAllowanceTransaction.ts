import { RequestAction } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { TransactionReceipt } from 'web3-core';

import { CONFIRMATION_BLOCKS } from 'multirpc-sdk';
import { MultiService } from 'modules/api/MultiService';
import { waitForPendingTransaction } from '../withdraw/waitForPendingTransaction';

export const checkAllowanceTransaction = createSmartAction<
  RequestAction<TransactionReceipt, TransactionReceipt>
>('topUp/checkAllowanceTransaction', (initialTransactionHash: string) => ({
  request: {
    promise: (async () => null)(),
  },
  meta: {
    onRequest: () => {
      return {
        promise: (async (): Promise<TransactionReceipt | null> => {
          // step 1: trying to take a receipt
          const service = await MultiService.getWeb3Service();
          const provider = service.getKeyProvider();
          const { currentAccount: address } = provider;

          const transactionReceipt = await service
            .getContractService()
            .getTransactionReceipt(initialTransactionHash);

          if (transactionReceipt) return transactionReceipt;

          // step 2: waiting for a pending transaction
          await waitForPendingTransaction();

          // step 3: trying to take a receipt again
          let transactionHash = initialTransactionHash;

          const receipt = await service
            .getContractService()
            .getTransactionReceipt(transactionHash);

          if (receipt) return receipt;

          // step 4: we already haven't had pending transaction and a receipt too -> check the latest allowance transaction
          const lastAllowanceEvent = await service
            .getContractService()
            .getLatestAllowanceEvent(address);

          const currentBlockNumber = await provider
            .getWeb3()
            .eth.getBlockNumber();

          // step 5: check blocks difference. This is old allowance transaction. New allowance transaction is failed or cancelled
          if (
            currentBlockNumber - (lastAllowanceEvent?.blockNumber || 0) >
            CONFIRMATION_BLOCKS
          ) {
            return null;
          }

          // step 6: use the latest allowance transaction from the blockchain
          if (
            lastAllowanceEvent?.transactionHash &&
            lastAllowanceEvent?.transactionHash !== initialTransactionHash
          ) {
            transactionHash = lastAllowanceEvent.transactionHash;
          }

          return service
            .getContractService()
            .getTransactionReceipt(transactionHash);
        })(),
      };
    },
  },
}));
