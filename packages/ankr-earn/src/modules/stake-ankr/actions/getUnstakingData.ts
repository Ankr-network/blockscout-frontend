import BigNumber from 'bignumber.js';

import { web3Api } from '../../api/web3Api';
import { AnkrStakingSDK } from '../api/AnkrStakingSDK';
import { IUnstakingData } from '../api/AnkrStakingSDK/types';
import { CacheTags } from '../cacheTags';

interface IGetUnstakingDataArgs {
  usdPrice: BigNumber;
}

// TODO Likelly bind to the current address: add providerTags argument
export const { useGetUnstakingDataQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getUnstakingData: build.query<IUnstakingData[], IGetUnstakingDataArgs>({
      queryFn: async ({ usdPrice }) => {
        const sdk = await AnkrStakingSDK.getInstance();

        return { data: await sdk.getUnstaking(usdPrice) };
      },
      providesTags: [CacheTags.history],
    }),
  }),
});
