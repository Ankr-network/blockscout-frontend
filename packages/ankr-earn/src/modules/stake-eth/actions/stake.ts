import { t } from '@ankr.com/common';
import BigNumber from 'bignumber.js';
import { push } from 'connected-react-router';

import { IStakeData, TEthToken } from '@ankr.com/staking-sdk';

import { getExtendedErrorText } from 'modules/api/utils/getExtendedErrorText';
import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';

import { CacheTags } from '../const';
import { RoutesConfig } from '../Routes';
import { getEthereumSDK } from '../utils/getEthereumSDK';
import { onError } from '../utils/onError';

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
        error => {
          const extendedErrorText = getExtendedErrorText(
            error,
            t('stake-ethereum.errors.stake'),
          );
          const extendedError = new Error(extendedErrorText);
          return onError(extendedError);
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
