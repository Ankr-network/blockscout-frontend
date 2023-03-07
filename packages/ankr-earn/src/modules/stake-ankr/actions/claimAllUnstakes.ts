import { t } from '@ankr.com/common';
import { push } from 'connected-react-router';

import { getExtendedErrorText } from 'modules/api/utils/getExtendedErrorText';
import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';
import { TxHash } from 'modules/common/types';

import { AnkrStakingSDK } from '../api/AnkrStakingSDK';
import { CacheTags } from '../cacheTags';
import { RoutesConfig } from '../RoutesConfig';

export const { useClaimAllUnstakesMutation } = web3Api.injectEndpoints({
  endpoints: build => ({
    claimAllUnstakes: build.mutation<TxHash, void>({
      queryFn: queryFnNotifyWrapper<void, never, TxHash>(
        async () => {
          const sdk = await AnkrStakingSDK.getInstance();

          return {
            data: await sdk.claimAllUnstakes(),
          };
        },
        error =>
          getExtendedErrorText(
            error,
            t('stake-ankr.errors.claim-all-unstakes'),
          ),
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
