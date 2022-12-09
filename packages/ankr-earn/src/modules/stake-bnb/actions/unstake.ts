import BigNumber from 'bignumber.js';
import { push } from 'connected-react-router';

import { IWeb3SendResult } from '@ankr.com/provider';
import { BinanceSDK } from '@ankr.com/staking-sdk';

import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';
import { getUnstakeDate } from 'modules/stake/actions/getUnstakeDate';

import { CacheTags } from '../const';
import { RoutesConfig } from '../Routes';
import { TBnbSyntToken } from '../types';

interface IUnstakeArgs {
  amount: BigNumber;
  token: TBnbSyntToken;
  externalAddress?: string;
}

export const { useUnstakeBNBMutation } = web3Api.injectEndpoints({
  endpoints: build => ({
    unstakeBNB: build.mutation<IWeb3SendResult, IUnstakeArgs>({
      queryFn: queryFnNotifyWrapper<IUnstakeArgs, never, IWeb3SendResult>(
        async ({ amount, token, externalAddress }) => {
          const sdk = await BinanceSDK.getInstance();

          if (externalAddress) {
            return {
              data: await sdk.unstakeToExternal(amount, token, externalAddress),
            };
          }

          return { data: await sdk.unstake(amount, token) };
        },
      ),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        return queryFulfilled.then(response => {
          const { transactionHash } = response.data;
          const { token } = args;

          if (transactionHash) {
            const path = RoutesConfig.unstakeSuccess.generatePath(
              token,
              response.data.transactionHash,
            );

            dispatch(getUnstakeDate());

            dispatch(push(path));
          }
        });
      },
      invalidatesTags: [CacheTags.common],
    }),
  }),
});
