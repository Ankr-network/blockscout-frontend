import BigNumber from 'bignumber.js';
import { push } from 'connected-react-router';

import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';
import { TxHash } from 'modules/common/types';

import { AnkrStakingSDK } from '../api/AnkrStakingSDK';
import { CacheTags } from '../cacheTags';
import { RoutesConfig } from '../RoutesConfig';

interface IUnstakeArgs {
  amount: BigNumber;
  provider: string;
}

export const { useUnstakeMutation } = web3Api.injectEndpoints({
  endpoints: build => ({
    unstake: build.mutation<TxHash, IUnstakeArgs>({
      queryFn: queryFnNotifyWrapper<IUnstakeArgs, never, TxHash>(
        async ({ amount, provider }) => {
          const sdk = await AnkrStakingSDK.getInstance();

          return { data: await sdk.undelegate(provider, amount) };
        },
      ),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        return queryFulfilled.then(response => {
          const txHash = response.data;

          if (txHash) {
            dispatch(
              push(
                RoutesConfig.unstakeSteps.generatePath({
                  txHash,
                }),
              ),
            );
          }
        });
      },
      invalidatesTags: [CacheTags.common, CacheTags.history],
    }),
  }),
});
