import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';

import { CacheTags } from '../const';
import { TAvaxSyntToken } from '../types';
import { getAvalancheSDK } from '../utils/getAvalancheSDK';

export const { useAddAVAXTokenToWalletMutation } = web3Api.injectEndpoints({
  endpoints: build => ({
    addAVAXTokenToWallet: build.mutation<boolean, TAvaxSyntToken>({
      queryFn: queryFnNotifyWrapper<TAvaxSyntToken, never, boolean>(
        async token => {
          const sdk = await getAvalancheSDK();
          return { data: await sdk.addTokenToWallet(token) };
        },
      ),
      invalidatesTags: [CacheTags.common],
    }),
  }),
});
