import { EBlockchain } from 'multirpc-sdk';
import { TransactionReceipt } from 'web3-core';

import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { createQuerySelectors } from 'store/utils/createQuerySelectors';
import { getWeb3Instance } from 'modules/api/utils/getWeb3Instance';
import { web3Api } from 'store/queries';

export interface IFetchTxReceiptParams {
  network: EBlockchain;
  txHash: string;
}

// The endpoint name is listed in endpointsSerializedByParams constant
// in packages/protocol/src/store/queries/index.ts file.
// If the name has changed it should be refelected there as well.
export const {
  endpoints: { fetchTxReceipt },
  useFetchTxReceiptQuery,
  useLazyFetchTxReceiptQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchTxReceipt: build.query<TransactionReceipt, IFetchTxReceiptParams>({
      queryFn: createNotifyingQueryFn(async ({ network, txHash }) => {
        const web3 = getWeb3Instance(network);

        const data = await web3.eth.getTransactionReceipt(txHash);

        return { data };
      }),
    }),
  }),
  overrideExisting: true,
});

export const {
  selectStateCachedByParams: selectTxReceiptState,
  selectDataCachedByParams: selectTxReceipt,
  selectLoadingCachedByParams: selectTxReceiptLoading,
} = createQuerySelectors({ endpoint: fetchTxReceipt });
