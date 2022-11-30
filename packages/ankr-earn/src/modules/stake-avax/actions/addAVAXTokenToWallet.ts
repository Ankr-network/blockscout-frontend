import { AvalancheSDK } from '@ankr.com/staking-sdk';

import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';
import { getTokenSymbol } from 'modules/common/utils/getTokenSymbol';

import { CacheTags } from '../const';
import { TAvaxSyntToken } from '../types';

export const { useAddAVAXTokenToWalletMutation } = web3Api.injectEndpoints({
  endpoints: build => ({
    addAVAXTokenToWallet: build.mutation<boolean, TAvaxSyntToken>({
      queryFn: queryFnNotifyWrapper<TAvaxSyntToken, never, boolean>(
        async token => {
          const sdk = await AvalancheSDK.getInstance();
          const tokenSymbol = getTokenSymbol(token);

          return { data: await sdk.addTokenToWallet(tokenSymbol) };
        },
      ),
      invalidatesTags: [CacheTags.common],
    }),
  }),
});
