import { push } from 'connected-react-router';
import { RootState } from 'store';

import { web3Api } from 'modules/api/web3Api';
import { TxHash } from 'modules/common/types';
import { queryFnNotifyWrapper } from 'modules/common/utils/queryFnNotifyWrapper';

import { AnkrStakingSDK } from '../api/AnkrStakingSDK';
import { CacheTags } from '../cacheTags';
import { RoutesConfig } from '../RoutesConfig';

import { selectLatestBlockNumber } from './getLatestBlockNumber';

export const { useClaimAllRewardsMutation } = web3Api.injectEndpoints({
  endpoints: build => ({
    claimAllRewards: build.mutation<TxHash, void>({
      queryFn: queryFnNotifyWrapper<void, never, TxHash>(
        async (args, { getState }) => {
          const sdk = await AnkrStakingSDK.getInstance();

          const { data: latestBlockNumber } = selectLatestBlockNumber(
            getState() as RootState,
          );

          const blockNumber = latestBlockNumber ?? (await sdk.getBlockNumber());

          return { data: await sdk.claimAllRewards(blockNumber) };
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
