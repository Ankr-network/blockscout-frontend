import { CONFIRMATION_BLOCKS } from 'multirpc-sdk';
import { TransactionReceipt } from 'web3-core';

import { GetState } from 'store';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { createQueryFnWithWeb3ServiceGuard } from 'store/utils/createQueryFnWithWeb3ServiceGuard';
import { getCurrentTransactionAddress } from 'domains/account/utils/getCurrentTransactionAddress';
import { web3Api } from 'store/queries';

import { waitForPendingTransaction } from './waitForPendingTransaction';

export const {
  useLazyTopUpCheckAllowanceTransactionQuery,
  endpoints: { topUpCheckAllowanceTransaction },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    topUpCheckAllowanceTransaction: build.query<
      TransactionReceipt | null,
      string
    >({
      queryFn: createQueryFnWithWeb3ServiceGuard({
        queryFn: createNotifyingQueryFn(
          async (
            { params: initialTransactionHash, web3Service },
            { getState },
          ) => {
            // step 1: trying to take a receipt
            const provider = web3Service.getKeyReadProvider();

            const address = getCurrentTransactionAddress(getState as GetState);

            const transactionReceipt = await web3Service
              .getContractService()
              .getTransactionReceipt(initialTransactionHash);

            if (transactionReceipt) return { data: transactionReceipt };

            // step 2: waiting for a pending transaction
            await waitForPendingTransaction(address);

            // step 3: trying to take a receipt again
            let transactionHash = initialTransactionHash;

            const receipt = await web3Service
              .getContractService()
              .getTransactionReceipt(transactionHash);

            if (receipt) return { data: receipt };

            // step 4: we already haven't had pending transaction and
            // a receipt too -> check the latest allowance transaction
            const lastAllowanceEvent = await web3Service
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

            const data = await web3Service
              .getContractService()
              .getTransactionReceipt(transactionHash);

            return { data };
          },
        ),
        fallback: { data: null },
      }),
    }),
  }),
});
