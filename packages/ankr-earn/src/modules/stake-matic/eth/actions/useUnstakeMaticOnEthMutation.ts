import BigNumber from 'bignumber.js';
import { push } from 'connected-react-router';

import { IWeb3SendResult } from '@ankr.com/provider';

import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';
import { TMaticSyntToken } from 'modules/stake-matic/common/types';
import { getUnstakeDate } from 'modules/stake/actions/getUnstakeDate';

import { CacheTags } from '../const';
import { RoutesConfig } from '../Routes';
import { getPolygonOnEthereumSDK } from '../utils/getPolygonOnEthereumSDK';

interface IUnstakePayload {
  amount: BigNumber;
  token: TMaticSyntToken;
}

export const { useUnstakeMaticOnEthMutation } = web3Api.injectEndpoints({
  endpoints: build => ({
    unstakeMaticOnEth: build.mutation<IWeb3SendResult, IUnstakePayload>({
      queryFn: queryFnNotifyWrapper<IUnstakePayload, never, IWeb3SendResult>(
        async ({ amount, token }) => {
          const sdk = await getPolygonOnEthereumSDK();

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
