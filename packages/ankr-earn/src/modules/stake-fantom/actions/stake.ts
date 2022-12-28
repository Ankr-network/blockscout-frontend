import BigNumber from 'bignumber.js';
import { push } from 'connected-react-router';

import { IStakeData } from '@ankr.com/staking-sdk';

import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';

import { CacheTags } from '../const';
import { RoutesConfig } from '../Routes';
import { TFtmSyntToken } from '../types/TFtmSyntToken';
import { getFantomSDK } from '../utils/getFantomSDK';

interface IStakeArgs {
  amount: BigNumber;
  token: TFtmSyntToken;
}

export const { useStakeFTMMutation } = web3Api.injectEndpoints({
  endpoints: build => ({
    stakeFTM: build.mutation<IStakeData, IStakeArgs>({
      queryFn: queryFnNotifyWrapper<IStakeArgs, never, IStakeData>(
        async ({ amount, token }) => {
          const sdk = await getFantomSDK();

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
                RoutesConfig.stakeStep.generatePath({
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
