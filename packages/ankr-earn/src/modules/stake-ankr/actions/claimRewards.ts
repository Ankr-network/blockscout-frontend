import { t } from '@ankr.com/common';
import { push } from 'connected-react-router';

import { getOnErrorWithCustomText } from 'modules/api/utils/getOnErrorWithCustomText';
import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';
import { TxHash } from 'modules/common/types';

import { AnkrStakingSDK } from '../api/AnkrStakingSDK';
import { CacheTags } from '../cacheTags';
import { RoutesConfig } from '../RoutesConfig';

interface IClaimArgs {
  provider: string;
}

export const { useClaimRewardsMutation } = web3Api.injectEndpoints({
  endpoints: build => ({
    claimRewards: build.mutation<TxHash, IClaimArgs>({
      queryFn: queryFnNotifyWrapper<IClaimArgs, never, TxHash>(
        async ({ provider }) => {
          const sdk = await AnkrStakingSDK.getInstance();

          return { data: await sdk.claimRewards(provider) };
        },
        getOnErrorWithCustomText(t('stake-ankr.errors.claim-rewards')),
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
