import { push } from 'connected-react-router';

import { TxHash } from 'modules/common/types';

import { web3Api } from '../../api/web3Api';
import { AnkrStakingSDK } from '../api/AnkrStakingSDK';
import { CacheTags } from '../cacheTags';
import { RoutesConfig } from '../RoutesConfig';

export const { useClaimAllRewardsMutation } = web3Api.injectEndpoints({
  endpoints: build => ({
    claimAllRewards: build.mutation<TxHash, void>({
      queryFn: async () => {
        const sdk = await AnkrStakingSDK.getInstance();

        return { data: await sdk.claimAllRewards() };
      },
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
