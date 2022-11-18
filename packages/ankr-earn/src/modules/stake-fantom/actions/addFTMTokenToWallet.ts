import { FantomSDK } from '@ankr.com/staking-sdk';

import { web3Api } from 'modules/api/web3Api';

import { CacheTags } from '../const';
import { TFtmSyntToken } from '../types/TFtmSyntToken';

export const { useAddFTMTokenToWalletMutation } = web3Api.injectEndpoints({
  endpoints: build => ({
    addFTMTokenToWallet: build.mutation<boolean, TFtmSyntToken>({
      queryFn: async token => {
        const sdk = await FantomSDK.getInstance();

        return { data: await sdk.addTokenToWallet(token) };
      },
      invalidatesTags: [CacheTags.common],
    }),
  }),
});
