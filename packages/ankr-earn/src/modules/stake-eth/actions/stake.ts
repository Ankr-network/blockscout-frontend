import BigNumber from 'bignumber.js';
import { push } from 'connected-react-router';

import { IStakeData, TEthToken } from '@ankr.com/staking-sdk';

import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';

import { CacheTags } from '../const';
import { RoutesConfig } from '../Routes';
import { getEthereumSDK } from '../utils/getEthereumSDK';

interface IStakeArgs {
  token: TEthToken;
  amount: BigNumber;
}

export const { useStakeETHMutation } = web3Api.injectEndpoints({
  endpoints: build => ({
    stakeETH: build.mutation<IStakeData, IStakeArgs>({
      queryFn: queryFnNotifyWrapper<IStakeArgs, never, IStakeData>(
        async ({ amount, token }) => {
          const sdk = await getEthereumSDK();

          return { data: await sdk.stake(amount, token) };
        },
      ),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        return queryFulfilled.then(response => {
          const { txHash } = response.data;
          const { token } = args;

          if (txHash) {
            dispatch(
              push(
                RoutesConfig.stakeSteps.generatePath({
                  txHash: response.data.txHash,
                  tokenOut: token,
                }),
              ),
            );
          }
        });
      },
      invalidatesTags: [CacheTags.common],
    }),
  }),
});
