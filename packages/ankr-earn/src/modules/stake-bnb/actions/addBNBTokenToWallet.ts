import { BinanceSDK } from '@ankr.com/staking-sdk';

import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';

import { CacheTags } from '../const';
import { TBnbSyntToken } from '../types';

export const { useAddBNBTokenToWalletMutation } = web3Api.injectEndpoints({
  endpoints: build => ({
    addBNBTokenToWallet: build.mutation<boolean, TBnbSyntToken>({
      queryFn: queryFnNotifyWrapper<TBnbSyntToken, never, boolean>(
        async token => {
          const sdk = await BinanceSDK.getInstance();

          return { data: await sdk.addTokenToWallet(token) };
        },
      ),
      invalidatesTags: [CacheTags.common],
    }),
  }),
});
