import { web3Api } from '../../api/web3Api';
import { AnkrStakingReadSDK } from '../api/AnkrStakingSDK';
import { IApyData } from '../api/AnkrStakingSDK/types';

export const { useGetAPYQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getAPY: build.query<IApyData[], void>({
      queryFn: async () => {
        const sdk = await AnkrStakingReadSDK.getInstance();

        const data = await sdk.getAPY();

        return { data };
      },
    }),
  }),
});
