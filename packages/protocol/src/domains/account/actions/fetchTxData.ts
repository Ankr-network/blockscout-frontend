import { Transaction } from 'web3-core';
import { EBlockchain } from 'multirpc-sdk';

import { getWeb3Instance } from 'modules/api/utils/getWeb3Instance';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { web3Api } from 'store/queries';

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
        const web3 = getWeb3Instance(network);
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
