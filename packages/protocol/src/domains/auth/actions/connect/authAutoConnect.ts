import { AuthConnectParams } from './types';

import { web3Api } from 'store/queries';
import { createWeb3Service } from './createWeb3Service';

export const {
  endpoints: { authAutoConnect },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    authAutoConnect: build.query<null, AuthConnectParams>({
      queryFn: async ({ params: { walletId } }, { dispatch }) => {
        await dispatch(createWeb3Service.initiate({ params: { walletId } }));

        return {
          data: null,
        };
      },
    }),
  }),
});
