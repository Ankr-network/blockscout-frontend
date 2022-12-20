import { CONFIRMATION_BLOCKS } from 'multirpc-sdk';
import { TransactionReceipt } from 'web3-core';

import { MultiService } from 'modules/api/MultiService';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { waitForPendingTransaction } from './waitForPendingTransaction';
import { web3Api } from 'store/queries';

export const {
  useLazyTopUpCheckAllowanceTransactionQuery,
  endpoints: { topUpCheckAllowanceTransaction },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    topUpCheckAllowanceTransaction: build.query<
      TransactionReceipt | null,
      string
    >({
      queryFn: createNotifyingQueryFn(async initialTransactionHash => {
        // step 1: trying to take a receipt
        const service = await MultiService.getWeb3Service();
        const provider = service.getKeyProvider();
        const { currentAccount: address } = provider;

        const transactionReceipt = await service
          .getContractService()
          .getTransactionReceipt(initialTransactionHash);

        if (transactionReceipt) return { data: transactionReceipt };

        // step 2: waiting for a pending transaction
        await waitForPendingTransaction();

        // step 3: trying to take a receipt again
        let transactionHash = initialTransactionHash;

        const receipt = await service
          .getContractService()
          .getTransactionReceipt(transactionHash);

        if (receipt) return { data: receipt };

        // step 4: we already haven't had pending transaction and
        // a receipt too -> check the latest allowance transaction
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
          return { data: null };
        }

        // step 6: use the latest allowance transaction from the blockchain
        if (
          lastAllowanceEvent?.transactionHash &&
          lastAllowanceEvent?.transactionHash !== initialTransactionHash
        ) {
          transactionHash = lastAllowanceEvent.transactionHash;
        }

        const data = await service
          .getContractService()
          .getTransactionReceipt(transactionHash);

        return { data };
      }),
    }),
  }),
});
