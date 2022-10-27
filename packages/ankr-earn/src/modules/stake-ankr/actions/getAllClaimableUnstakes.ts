import { web3Api } from '../../api/web3Api';
import { AnkrStakingSDK } from '../api/AnkrStakingSDK';
import { IClaimableUnstake } from '../api/AnkrStakingSDK/types';

// TODO showNotificationOnError

export const { useLazyGetAllClaimableUnstakesQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getAllClaimableUnstakes: build.query<IClaimableUnstake[], void>({
      queryFn: async () => {
        const sdk = await AnkrStakingSDK.getInstance();
        const provider = await sdk.getProvider();

        const data = await sdk.getAllClaimableUnstakes(
          await provider.getBlockNumber(),
        );

        return { data };
      },
    }),
  }),
});
