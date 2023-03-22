import { t } from '@ankr.com/common';
import BigNumber from 'bignumber.js';
import { push } from 'connected-react-router';

import { IStakeData } from '@ankr.com/staking-sdk';

import { getExtendedErrorText } from 'modules/api/utils/getExtendedErrorText';
import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';

import { CacheTags } from '../const';
import { RoutesConfig } from '../Routes';
import { TAvaxSyntToken } from '../types';
import { getAvalancheSDK } from '../utils/getAvalancheSDK';

interface IStakeArgs {
  amount: BigNumber;
  token: TAvaxSyntToken;
}

export const { useStakeAVAXMutation } = web3Api.injectEndpoints({
  endpoints: build => ({
    stakeAVAX: build.mutation<IStakeData, IStakeArgs>({
      queryFn: queryFnNotifyWrapper<IStakeArgs, never, IStakeData>(
        async ({ amount, token }) => {
          const sdk = await getAvalancheSDK();

          return { data: await sdk.stake(amount, token) };
        },
        error => getExtendedErrorText(error, t('stake-avax.errors.stake')),
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