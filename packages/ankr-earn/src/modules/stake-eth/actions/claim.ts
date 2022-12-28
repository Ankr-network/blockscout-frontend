import { push } from 'connected-react-router';
import { RootState } from 'store';

import { IWeb3SendResult } from '@ankr.com/provider';
import { TEthToken } from '@ankr.com/staking-sdk';

import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';
import { ZERO } from 'modules/common/const';
import { Token } from 'modules/common/types/token';

import { CacheTags } from '../const';
import { RoutesConfig } from '../Routes';
import { getEthereumSDK } from '../utils/getEthereumSDK';

import { selectETHClaimableData } from './getClaimableData';

export const { useClaimETHMutation } = web3Api.injectEndpoints({
  endpoints: build => ({
    claimETH: build.mutation<IWeb3SendResult, TEthToken>({
      queryFn: queryFnNotifyWrapper<TEthToken, never, IWeb3SendResult>(
        async token => {
          const sdk = await getEthereumSDK();

          return { data: await sdk.claim(token) };
        },
      ),
      async onQueryStarted(args, { dispatch, queryFulfilled, getState }) {
        return queryFulfilled.then(response => {
          const { transactionHash } = response.data;

          const { data } = selectETHClaimableData(getState() as RootState);
          const amount = (
            args === Token.aETHb
              ? data?.claimableAETHB ?? ZERO
              : data?.claimableAETHC ?? ZERO
          ).toString();

          if (transactionHash) {
            const claimStepsPath = RoutesConfig.claimSteps.generatePath({
              tokenOut: args,
              txHash: transactionHash,
              amount,
            });

            dispatch(push(claimStepsPath));
          }
        });
      },
      invalidatesTags: [CacheTags.common],
    }),
  }),
});
