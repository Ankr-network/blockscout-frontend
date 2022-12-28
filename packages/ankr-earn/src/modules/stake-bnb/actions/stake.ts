import BigNumber from 'bignumber.js';
import { push } from 'connected-react-router';

import { IStakeData } from '@ankr.com/staking-sdk';

import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';

import { CacheTags } from '../const';
import { RoutesConfig } from '../Routes';
import { TBnbSyntToken } from '../types';
import { getBinanceSDK } from '../utils/getBinanceSDK';

interface IStakeArgs {
  amount: BigNumber;
  token: TBnbSyntToken;
  code?: string;
}

export const { useStakeBNBMutation } = web3Api.injectEndpoints({
  endpoints: build => ({
    stakeBNB: build.mutation<IStakeData, IStakeArgs>({
      queryFn: queryFnNotifyWrapper<IStakeArgs, never, IStakeData>(
        async ({ amount, token, code }) => {
          const sdk = await getBinanceSDK();

          return { data: await sdk.stake(amount, token, undefined, code) };
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
