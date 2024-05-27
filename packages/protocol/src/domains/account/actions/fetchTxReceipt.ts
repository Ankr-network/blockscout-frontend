import Web3 from 'web3';
import { TransactionReceipt } from 'web3-core';
import { EBlockchain } from 'multirpc-sdk';

import { web3Api } from 'store/queries';
import { createWeb3NotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';

import { getRpcUrlByNetwork } from '../utils/getRpcUrlByNetwork';

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
      queryFn: createWeb3NotifyingQueryFn(async ({ txHash, network }) => {
        const rpcUrl = getRpcUrlByNetwork(network);
        const web3 = new Web3(rpcUrl);

        const data = await web3.eth.getTransactionReceipt(txHash);

        return { data };
      }),
    }),
  }),
  overrideExisting: true,
});
