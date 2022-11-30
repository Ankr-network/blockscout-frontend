import { BinanceSDK } from '@ankr.com/staking-sdk';

import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';
import { getTokenSymbol } from 'modules/common/utils/getTokenSymbol';

import { CacheTags } from '../const';
import { TBnbSyntToken } from '../types';

export const { useAddBNBTokenToWalletMutation } = web3Api.injectEndpoints({
  endpoints: build => ({
    addBNBTokenToWallet: build.mutation<boolean, TBnbSyntToken>({
      queryFn: queryFnNotifyWrapper<TBnbSyntToken, never, boolean>(
        async token => {
          const sdk = await BinanceSDK.getInstance();
          const tokenSymbol = getTokenSymbol(token);

          return { data: await sdk.addTokenToWallet(tokenSymbol) };
        },
      ),
      invalidatesTags: [CacheTags.common],
    }),
  }),
});
