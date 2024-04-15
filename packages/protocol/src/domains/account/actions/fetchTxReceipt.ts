import { TransactionReceipt } from 'web3-core';

import { API_ENV, getReadProviderId } from 'modules/common/utils/environment';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { getProviderManager } from 'modules/api/getProviderManager';
import { web3Api } from 'store/queries';

export interface IFetchTxReceiptParams {
  txHash: string;
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
      queryFn: createNotifyingQueryFn(async ({ txHash }) => {
        const providerManager = getProviderManager();
        const provider = await providerManager.getETHReadProvider(
          getReadProviderId(API_ENV),
        );

        const data = await provider.getWeb3().eth.getTransactionReceipt(txHash);

        return { data };
      }),
    }),
  }),
  overrideExisting: true,
});
