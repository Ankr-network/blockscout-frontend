import { t } from '@ankr.com/common';
import { push } from 'connected-react-router';

import { getOnErrorWithCustomText } from 'modules/api/utils/getOnErrorWithCustomText';
import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';
import { TxHash } from 'modules/common/types';

import { AnkrStakingSDK } from '../api/AnkrStakingSDK';
import { CacheTags } from '../cacheTags';
import { RoutesConfig } from '../RoutesConfig';

export const { useClaimAllUnstakesMutation } = web3Api.injectEndpoints({
  endpoints: build => ({
    claimAllUnstakes: build.mutation<TxHash, void>({
      queryFn: queryFnNotifyWrapper<void, never, TxHash>(async () => {
        const sdk = await AnkrStakingSDK.getInstance();
        const provider = await sdk.getProvider();

        return {
          data: await sdk.claimAllUnstakes(await provider.getBlockNumber()),
        };
      }, getOnErrorWithCustomText(t('stake-ankr.errors.claim-all-unstakes'))),

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
