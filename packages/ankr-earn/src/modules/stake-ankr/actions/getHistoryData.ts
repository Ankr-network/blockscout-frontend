import { isWriteProvider } from '@ankr.com/provider-core';

import { web3Api } from '../../api/web3Api';
import { AnkrStakingSDK } from '../api/AnkrStakingSDK';
import { IHistoryData } from '../api/AnkrStakingSDK/types';
import { CacheTags } from '../cacheTags';

export const { useGetHistoryDataQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getHistoryData: build.query<IHistoryData[], void>({
      queryFn: async () => {
        const sdk = await AnkrStakingSDK.getInstance();
        const provider = await sdk.getProvider();

        if (isWriteProvider(provider)) {
          return {
            data: await sdk.getAllEventsHistory(
              provider.currentAccount,
              await provider.getBlockNumber(),
            ),
          };
        }

        throw new Error('Current account is not defined');
      },
      providesTags: [CacheTags.history],
    }),
  }),
});
