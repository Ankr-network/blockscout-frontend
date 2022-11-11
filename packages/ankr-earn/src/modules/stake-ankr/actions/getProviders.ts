import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';

import { AnkrStakingSDK } from '../api/AnkrStakingSDK';
import { IValidator } from '../api/AnkrStakingSDK/types';

export const { useGetProvidersQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getProviders: build.query<IValidator[], void>({
      queryFn: queryFnNotifyWrapper<void, never, IValidator[]>(async () => {
        const sdk = await AnkrStakingSDK.getInstance();
        const provider = await sdk.getProvider();

        return {
          data: await sdk.getAllValidators(await provider.getBlockNumber()),
        };
      }),
    }),
  }),
});
