import { FantomSDK } from '@ankr.com/staking-sdk';

import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';
import { getTokenSymbol } from 'modules/common/utils/getTokenSymbol';

import { CacheTags } from '../const';
import { TFtmSyntToken } from '../types/TFtmSyntToken';

export const { useAddFTMTokenToWalletMutation } = web3Api.injectEndpoints({
  endpoints: build => ({
    addFTMTokenToWallet: build.mutation<boolean, TFtmSyntToken>({
      queryFn: queryFnNotifyWrapper<TFtmSyntToken, never, boolean>(
        async token => {
          const sdk = await FantomSDK.getInstance();
          const tokenSymbol = getTokenSymbol(token);

          return { data: await sdk.addTokenToWallet(tokenSymbol) };
        },
      ),
      invalidatesTags: [CacheTags.common],
    }),
  }),
});
