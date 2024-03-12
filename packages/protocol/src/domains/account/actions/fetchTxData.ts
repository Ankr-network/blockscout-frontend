import { Transaction } from 'web3-core';

import { getProviderManager } from 'modules/api/getProviderManager';
import { API_ENV, getReadProviderId } from 'modules/common/utils/environment';
import { web3Api } from 'store/queries';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';

interface IGetTxDataProps {
  txHash: string;
}

export const { useGetTxDataQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getTxData: build.query<Transaction, IGetTxDataProps>({
      queryFn: createNotifyingQueryFn<IGetTxDataProps, never, Transaction>(
        async ({ txHash }) => {
          const providerManager = getProviderManager();
          const provider = await providerManager.getETHReadProvider(
            getReadProviderId(API_ENV),
          );

          const data = await provider.getWeb3().eth.getTransaction(txHash);

          return {
            data,
          };
        },
      ),
    }),
  }),
  overrideExisting: true,
});
