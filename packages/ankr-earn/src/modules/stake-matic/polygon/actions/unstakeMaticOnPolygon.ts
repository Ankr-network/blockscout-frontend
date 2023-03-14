import { t } from '@ankr.com/common';
import BigNumber from 'bignumber.js';
import { push } from 'connected-react-router';

import { IWeb3SendResult } from '@ankr.com/provider';
import { PolygonOnPolygonSDK } from '@ankr.com/staking-sdk';

import { getExtendedErrorText } from 'modules/api/utils/getExtendedErrorText';
import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';
import { TMaticSyntToken } from 'modules/stake-matic/common/types';

import { CacheTags } from '../const';
import { RoutesConfig } from '../Routes';

interface IUnstakeProps {
  amount: BigNumber;
  token: TMaticSyntToken;
}

export const { useUnstakeMaticOnPolygonMutation } = web3Api.injectEndpoints({
  endpoints: build => ({
    unstakeMaticOnPolygon: build.mutation<IWeb3SendResult, IUnstakeProps>({
      queryFn: queryFnNotifyWrapper<IUnstakeProps, never, IWeb3SendResult>(
        async ({ amount, token }) => {
          const sdk = await PolygonOnPolygonSDK.getInstance();

          return { data: await sdk.unstake(amount, token) };
        },
        error =>
          getExtendedErrorText(error, t('stake-matic-common.errors.unstake')),
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
