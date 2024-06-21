import { EBlockchain } from 'multirpc-sdk';
import { TransactionReceipt } from 'web3-core';

import { createQuerySelectors } from 'store/utils/createQuerySelectors';
import { createWeb3NotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { getWeb3Instance } from 'modules/api/utils/getWeb3Instance';
import { web3Api } from 'store/queries';

export interface IFetchBlockchainTxReceiptParams {
  network: EBlockchain;
  txHash: string;
}

// The endpoint name is listed in endpointsSerializedByParams constant
// in packages/protocol/src/store/queries/index.ts file.
// If the name has changed it should be refelected there as well.
export const {
  endpoints: { fetchBlockchainTxReceipt },
  useFetchBlockchainTxReceiptQuery,
  useLazyFetchBlockchainTxReceiptQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchBlockchainTxReceipt: build.query<
      TransactionReceipt,
      IFetchBlockchainTxReceiptParams
    >({
      queryFn: createWeb3NotifyingQueryFn(async ({ network, txHash }) => {
        const web3 = getWeb3Instance(network);

        const data = await web3.eth.getTransactionReceipt(txHash);

        return { data };
      }),
    }),
  }),
  overrideExisting: true,
});

export const {
  selectDataCachedByParams: selectBlockchainTxReceipt,
  selectLoadingCachedByParams: selectBlockchainTxReceiptLoading,
  selectStateCachedByParams: selectBlockchainTxReceiptState,
} = createQuerySelectors({ endpoint: fetchBlockchainTxReceipt });
