import { t } from '@ankr.com/common';
import BigNumber from 'bignumber.js';
import { push } from 'connected-react-router';

import { IWeb3SendResult } from '@ankr.com/provider';

import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';
import { getUnstakeDate } from 'modules/stake/actions/getUnstakeDate';

import { CacheTags } from '../const';
import { RoutesConfig } from '../Routes';
import { TBnbSyntToken } from '../types';
import { getBinanceSDK } from '../utils/getBinanceSDK';
import { onError } from '../utils/onError';

const INVALID_ADDRESS_MESSAGE = 'bad address checksum';

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
          const sdk = await getBinanceSDK();

          try {
            if (externalAddress) {
              return {
                data: await sdk.unstakeToExternal(
                  amount,
                  token,
                  externalAddress,
                ),
              };
            }

            return { data: await sdk.unstake(amount, token) };
          } catch (e) {
            if ((e as Error)?.message.includes(INVALID_ADDRESS_MESSAGE)) {
              throw new Error(t('validation.invalid-address'));
            }
            throw e;
          }
        },
        onError,
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
