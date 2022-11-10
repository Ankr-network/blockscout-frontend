import { push } from 'connected-react-router';

import { web3Api } from 'modules/api/web3Api';
import { TxHash } from 'modules/common/types';
import { queryFnNotifyWrapper } from 'modules/common/utils/queryFnNotifyWrapper';

import { AnkrStakingSDK } from '../api/AnkrStakingSDK';
import { CacheTags } from '../cacheTags';
import { RoutesConfig } from '../RoutesConfig';

interface IClaimArgs {
  provider: string;
}

export const { useClaimAllForValidatorMutation } = web3Api.injectEndpoints({
  endpoints: build => ({
    claimAllForValidator: build.mutation<TxHash, IClaimArgs>({
      queryFn: queryFnNotifyWrapper<IClaimArgs, never, TxHash>(
        async ({ provider }) => {
          const sdk = await AnkrStakingSDK.getInstance();

          return { data: await sdk.claimAllForValidator(provider) };
        },
      ),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        return queryFulfilled.then(response => {
          const txHash = response.data;

          if (txHash) {
            dispatch(
              push(
                RoutesConfig.claimRewardsSteps.generatePath({
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
