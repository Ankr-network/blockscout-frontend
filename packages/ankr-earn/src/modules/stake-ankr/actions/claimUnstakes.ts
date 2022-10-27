import { push } from 'connected-react-router';

import { TxHash } from 'modules/common/types';

import { web3Api } from '../../api/web3Api';
import { AnkrStakingSDK } from '../api/AnkrStakingSDK';
import { CacheTags } from '../cacheTags';
import { RoutesConfig } from '../RoutesConfig';

interface IClaimArgs {
  provider: string;
}

export const { useClaimUnstakesMutation } = web3Api.injectEndpoints({
  endpoints: build => ({
    claimUnstakes: build.mutation<TxHash, IClaimArgs>({
      queryFn: async ({ provider }) => {
        const sdk = await AnkrStakingSDK.getInstance();

        return { data: await sdk.claimUnstakes(provider) };
      },
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        return queryFulfilled.then(response => {
          const txHash = response.data;

          if (txHash) {
            dispatch(
              push(
                RoutesConfig.claimUnstakesSteps.generatePath({
                  txHash,
                }),
              ),
            );
          }
        });
      },
      invalidatesTags: [CacheTags.history],
    }),
  }),
});
