import { TransactionReceipt } from 'web3-core';

import { getProviderManager } from 'modules/api/getProviderManager';
import { API_ENV, getReadProviderId } from 'modules/common/utils/environment';
import { web3Api } from 'store/queries';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';

interface IGetTxReceiptProps {
  txHash: string;
}

export const { useGetTxReceiptQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getTxReceipt: build.query<TransactionReceipt, IGetTxReceiptProps>({
      queryFn: createNotifyingQueryFn<
        IGetTxReceiptProps,
        never,
        TransactionReceipt
      >(async ({ txHash }) => {
        const providerManager = getProviderManager();
        const provider = await providerManager.getETHReadProvider(
          getReadProviderId(API_ENV),
        );

        const data = await provider.getWeb3().eth.getTransactionReceipt(txHash);

        return {
          data,
        };
      }),
    }),
  }),
  overrideExisting: true,
});
