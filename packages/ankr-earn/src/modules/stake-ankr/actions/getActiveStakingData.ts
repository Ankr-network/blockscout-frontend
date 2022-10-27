import { BigNumber } from 'bignumber.js';

import { web3Api } from '../../api/web3Api';
import { AnkrStakingSDK } from '../api/AnkrStakingSDK';
import { IActiveStakingData } from '../api/AnkrStakingSDK/types';
import { CacheTags } from '../cacheTags';

interface IGetActiveStakingDataArgs {
  usdPrice: BigNumber;
}

// TODO Likelly bind to the current address: add providerTags argument
export const { useGetActiveStakingDataQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getActiveStakingData: build.query<
      IActiveStakingData[],
      IGetActiveStakingDataArgs
    >({
      queryFn: async ({ usdPrice }) => {
        const sdk = await AnkrStakingSDK.getInstance();

        return { data: await sdk.getMyActiveStaking(usdPrice) };
      },
      providesTags: [CacheTags.history],
    }),
  }),
});
