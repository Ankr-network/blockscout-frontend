import { web3Api } from '../../api/web3Api';
import { AnkrStakingSDK } from '../api/AnkrStakingSDK';

export const { useGetEpochEndSecondsQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getEpochEndSeconds: build.query<number, void>({
      queryFn: async () => {
        const sdk = await AnkrStakingSDK.getInstance();
        const provider = await sdk.getProvider();

        return {
          data: await sdk.getEpochEndSeconds(await provider.getBlockNumber()),
        };
      },
    }),
  }),
});
