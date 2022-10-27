import BigNumber from 'bignumber.js';

import { web3Api } from '../../api/web3Api';
import { AnkrStakingReadSDK } from '../api/AnkrStakingSDK';
import { TEMPORARY_APY } from '../const';

export const { useGetMaxApyQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getMaxApy: build.query<BigNumber, void>({
      queryFn: async () => {
        const sdk = await AnkrStakingReadSDK.getInstance();

        const apyData = await sdk.getAPY();

        const maxApy = apyData?.sort((a, b) =>
          a.apy.isGreaterThan(b.apy) ? -1 : 1,
        );

        return { data: maxApy[0].apy ?? TEMPORARY_APY };
      },
    }),
  }),
});
