import { Transaction } from 'web3-core';

import { API_ENV, getReadProviderId } from 'modules/common/utils/environment';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { getProviderManager } from 'modules/api/getProviderManager';
import { web3Api } from 'store/queries';

export interface IFetchTxDataParams {
  txHash: string;
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
      queryFn: createNotifyingQueryFn(async ({ txHash }) => {
        const providerManager = getProviderManager();
        const provider = await providerManager.getETHReadProvider(
          getReadProviderId(API_ENV),
        );

        const tx = await provider.getWeb3().eth.getTransaction(txHash);

        const { blockNumber } = tx;

        const block = blockNumber
          ? await provider.getWeb3().eth.getBlock(blockNumber)
          : undefined;

        const timestamp = block?.timestamp;

        return { data: { timestamp, tx } };
      }),
    }),
  }),
  overrideExisting: true,
});
