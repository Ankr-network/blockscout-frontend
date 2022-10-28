import { web3Api } from '../../api/web3Api';
import { AnkrStakingSDK } from '../api/AnkrStakingSDK';

export const {
  useGetLatestBlockNumberQuery,
  endpoints: { getLatestBlockNumber },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    getLatestBlockNumber: build.query<number, void>({
      queryFn: async () => {
        const sdk = await AnkrStakingSDK.getInstance();

        const data = await sdk.getBlockNumber();

        return { data };
      },
    }),
  }),
});

export const selectLatestBlockNumber = getLatestBlockNumber.select();
