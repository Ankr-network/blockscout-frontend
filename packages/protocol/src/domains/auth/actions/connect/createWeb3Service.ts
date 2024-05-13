import { MultiService } from 'modules/api/MultiService';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { web3Api } from 'store/queries';

import { AuthConnectParams } from './types';

export const {
  endpoints: { createWeb3Service },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    createWeb3Service: build.query<null, AuthConnectParams>({
      queryFn: createNotifyingQueryFn(async ({ params: { walletId } }) => {
        await MultiService.createWeb3Service(walletId);

        return {
          data: null,
        };
      }),
    }),
  }),
});
