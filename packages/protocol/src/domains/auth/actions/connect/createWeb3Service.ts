import { AuthConnectParams } from './types';
import { resetAuthData } from '../../store/authSlice';
import { INJECTED_WALLET_ID, MultiService } from 'modules/api/MultiService';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { switchChain } from './connectUtils';

import { web3Api } from 'store/queries';

export const {
  endpoints: { createWeb3Service },
  useLazyCreateWeb3ServiceQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    createWeb3Service: build.query<null, AuthConnectParams>({
      queryFn: createNotifyingQueryFn(
        async ({ params: { walletId } }, { dispatch }) => {
          await MultiService.createWeb3Service(walletId);

          if (walletId === INJECTED_WALLET_ID) {
            try {
              await switchChain();
            } catch (error) {
              dispatch(resetAuthData());

              throw error;
            }
          }

          return {
            data: null,
          };
        },
      ),
    }),
  }),
});