import { web3Api } from 'modules/api/web3Api';
import { queryFnNotifyWrapper } from 'modules/common/utils/queryFnNotifyWrapper';

import { AnkrStakingSDK } from '../api/AnkrStakingSDK';
import { IClaimableUnstake } from '../api/AnkrStakingSDK/types';

export const { useLazyGetAllClaimableUnstakesQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getAllClaimableUnstakes: build.query<IClaimableUnstake[], void>({
      queryFn: queryFnNotifyWrapper<void, never, IClaimableUnstake[]>(
        async () => {
          const sdk = await AnkrStakingSDK.getInstance();
          const provider = await sdk.getProvider();

          const data = await sdk.getAllClaimableUnstakes(
            await provider.getBlockNumber(),
          );

          return { data };
        },
      ),
    }),
  }),
});
