import Web3 from 'web3';
import { Transaction } from 'web3-core';
import { EBlockchain } from 'multirpc-sdk';

import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { web3Api } from 'store/queries';

import { getRpcUrlByNetwork } from '../utils/getRpcUrlByNetwork';

export interface IFetchTxDataParams {
  txHash: string;
  network: EBlockchain;
}

export interface IFetchTxDataResult {
  timestamp?: string | number;
  tx: Transaction;
}

// The endpoint name is listed in endpointsSerializedByParams constant
// in packages/protocol/src/store/queries/index.ts file.
// If the name has changed it should be refelected there as well.
export const {
  endpoints: { fetchTxData },
  useFetchTxDataQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchTxData: build.query<IFetchTxDataResult, IFetchTxDataParams>({
      queryFn: createNotifyingQueryFn(async ({ txHash, network }) => {
        const rpcUrl = getRpcUrlByNetwork(network);
        const web3 = new Web3(rpcUrl);
        const tx = await web3.eth.getTransaction(txHash);

        const { blockNumber } = tx;

        const block = blockNumber
          ? await web3.eth.getBlock(blockNumber)
          : undefined;

        const timestamp = block?.timestamp;

        return { data: { timestamp, tx } };
      }),
    }),
  }),
  overrideExisting: true,
});
