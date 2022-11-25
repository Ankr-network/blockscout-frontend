import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';

import { CacheTags } from '../const';

export const { useAddSUITokenToWalletMutation } = web3Api.injectEndpoints({
  endpoints: build => ({
    addSUITokenToWallet: build.mutation<boolean, void>({
      queryFn: queryFnNotifyWrapper<void, never, boolean>(async () => {
        return { data: true };
      }),
      invalidatesTags: [CacheTags.common],
    }),
  }),
});
