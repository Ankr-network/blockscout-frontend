import { TransactionReceipt } from 'web3-core';
import { EBlockchain } from 'multirpc-sdk';

import { getWeb3Instance } from 'modules/api/utils/getWeb3Instance';
import { web3Api } from 'store/queries';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';

export interface IFetchTxReceiptParams {
  txHash: string;
  network: EBlockchain;
}

// The endpoint name is listed in endpointsSerializedByParams constant
// in packages/protocol/src/store/queries/index.ts file.
// If the name has changed it should be refelected there as well.
export const {
  endpoints: { fetchTxReceipt },
  useFetchTxReceiptQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchTxReceipt: build.query<TransactionReceipt, IFetchTxReceiptParams>({
      queryFn: createNotifyingQueryFn(async ({ txHash, network }) => {
        const web3 = getWeb3Instance(network);

        const data = await web3.eth.getTransactionReceipt(txHash);

        return { data };
      }),
    }),
  }),
  overrideExisting: true,
});
