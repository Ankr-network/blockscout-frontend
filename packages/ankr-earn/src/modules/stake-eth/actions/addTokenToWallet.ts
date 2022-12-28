import { TEthToken } from '@ankr.com/staking-sdk';

import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';

import { CacheTags } from '../const';
import { getEthereumSDK } from '../utils/getEthereumSDK';

export const { useAddETHTokenToWalletMutation } = web3Api.injectEndpoints({
  endpoints: build => ({
    addETHTokenToWallet: build.mutation<boolean, TEthToken>({
      queryFn: queryFnNotifyWrapper<TEthToken, never, boolean>(async token => {
        const sdk = await getEthereumSDK();

        return { data: await sdk.addTokenToWallet(token) };
      }),
      invalidatesTags: [CacheTags.common],
    }),
  }),
});
