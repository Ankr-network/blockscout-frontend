import BigNumber from 'bignumber.js';

import { web3Api } from '../../api/web3Api';
import { AnkrStakingReadSDK } from '../api/AnkrStakingSDK';

export const { useGetTotalTvlQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getTotalTvl: build.query<BigNumber, void>({
      queryFn: async () => {
        const sdk = await AnkrStakingReadSDK.getInstance();
        const provider = await sdk.getProvider();
        const latestBlockNumber = await provider.getBlockNumber();

        return { data: await sdk.getTotalTVL(latestBlockNumber) };
      },
    }),
  }),
});
