import { t } from '@ankr.com/common';
import BigNumber from 'bignumber.js';
import { push } from 'connected-react-router';

import { IWeb3SendResult } from '@ankr.com/provider';

import { getExtendedErrorText } from 'modules/api/utils/getExtendedErrorText';
import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';

import { CacheTags } from '../const';
import { RoutesConfig } from '../Routes';
import { TAvaxSyntToken } from '../types';
import { getAvalancheSDK } from '../utils/getAvalancheSDK';

interface IUnstakeArgs {
  amount: BigNumber;
  token: TAvaxSyntToken;
}

export const { useUnstakeAVAXMutation } = web3Api.injectEndpoints({
  endpoints: build => ({
    unstakeAVAX: build.mutation<IWeb3SendResult, IUnstakeArgs>({
      queryFn: queryFnNotifyWrapper<IUnstakeArgs, never, IWeb3SendResult>(
        async ({ amount, token }) => {
          const sdk = await getAvalancheSDK();

          return { data: await sdk.unstake(amount, token) };
        },
        error => getExtendedErrorText(error, t('stake-avax.errors.unstake')),
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

            dispatch(push(path));
          }
        });
      },
      invalidatesTags: [CacheTags.common],
    }),
  }),
});
