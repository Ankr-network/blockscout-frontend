import BigNumber from 'bignumber.js';
import { push } from 'connected-react-router';

import { IWeb3SendResult } from '@ankr.com/provider';
import { FantomSDK } from '@ankr.com/staking-sdk';

import { web3Api } from 'modules/api/web3Api';

import { CacheTags } from '../const';
import { RoutesConfig } from '../Routes';
import { TFtmSyntToken } from '../types/TFtmSyntToken';

interface IUnstakeArgs {
  amount: BigNumber;
  token: TFtmSyntToken;
}

export const { useUnstakeFTMMutation } = web3Api.injectEndpoints({
  endpoints: build => ({
    unstakeFTM: build.mutation<IWeb3SendResult, IUnstakeArgs>({
      queryFn: async ({ amount, token }) => {
        const sdk = await FantomSDK.getInstance();

        return { data: await sdk.unstake(amount, token) };
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        return queryFulfilled.then(response => {
          const { transactionHash } = response.data;
          const { token } = args;

          if (transactionHash) {
            const path = RoutesConfig.unstakeSuccess.generatePath(
              token,
              response.data.transactionHash,
            );

            dispatch(push(path));
          }
        });
      },
      invalidatesTags: [CacheTags.common],
    }),
  }),
});
