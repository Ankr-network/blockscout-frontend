import BigNumber from 'bignumber.js';
import { push } from 'connected-react-router';

import { IStakeData, PolygonOnEthereumSDK } from '@ankr.com/staking-sdk';

import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';
import { TMaticSyntToken } from 'modules/stake-matic/common/types';

import { CacheTags } from '../const';
import { RoutesConfig } from '../Routes';

interface IStakePayload {
  amount: BigNumber;
  token: TMaticSyntToken;
}

export const { useStakeMaticOnEthMutation } = web3Api.injectEndpoints({
  endpoints: build => ({
    stakeMaticOnEth: build.mutation<IStakeData, IStakePayload>({
      queryFn: queryFnNotifyWrapper<IStakePayload, never, IStakeData>(
        async ({ amount, token }) => {
          const sdk = await PolygonOnEthereumSDK.getInstance();

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
                RoutesConfig.stakeStep.generatePath(
                  token,
                  response.data.txHash,
                ),
              ),
            );
          }
        });
      },
      invalidatesTags: [CacheTags.common],
    }),
  }),
});
