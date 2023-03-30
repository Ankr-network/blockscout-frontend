import BigNumber from 'bignumber.js';
import { push } from 'connected-react-router';

import { IWeb3SendResult } from '@ankr.com/provider';

import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';
import { Token } from 'modules/common/types/token';

import { SwitcherSDK } from '../api/SwitcherSDK';
import {
  AvailableSwitcherToken,
  AvailableSwitchNetwork,
  SwitcherCacheTags,
  SWITCHER_TO_TOKENS,
} from '../const';

export interface ISwapAssetsArgs {
  amount: string;
  from: Token;
  to: Token;
  ratio: BigNumber;
  chainId: AvailableSwitchNetwork;
}

export const { useSwapAssetsMutation } = web3Api.injectEndpoints({
  endpoints: build => ({
    swapAssets: build.mutation<IWeb3SendResult | undefined, ISwapAssetsArgs>({
      queryFn: queryFnNotifyWrapper<
        ISwapAssetsArgs,
        never,
        IWeb3SendResult | undefined
      >(async ({ from, amount, ratio, chainId }) => {
        const sdk = await SwitcherSDK.getInstance();

        const isCertificate = SWITCHER_TO_TOKENS.includes(from);
        const params = {
          amount: new BigNumber(amount),
          chainId,
          token: from as AvailableSwitcherToken,
        };

        const data = await (isCertificate
          ? sdk.lockShares(params)
          : sdk.unlockShares({ ...params, ratio }));

        return {
          data,
        };
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        return queryFulfilled.then(response => {
          const { to, from } = args;

          if (response.data?.transactionHash && from && to) {
            dispatch(push(`${from}/${to}/${response.data.transactionHash}`));
          }
        });
      },
      invalidatesTags: [SwitcherCacheTags.common],
    }),
  }),
});
