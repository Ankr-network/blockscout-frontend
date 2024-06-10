import { MultiService } from 'modules/api/MultiService';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { createQuerySelectors } from 'store/utils/createQuerySelectors';
import { web3Api } from 'store/queries';

import { AuthConnectParams } from './types';

export const {
  endpoints: { createWeb3Service },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    createWeb3Service: build.query<boolean, AuthConnectParams>({
      queryFn: createNotifyingQueryFn(async ({ params: { walletId } }) => {
        await MultiService.createWeb3Service(walletId);

        return { data: true };
      }),
    }),
  }),
});

export const {
  selectDataWithFallback: selectHasWeb3Service,
  selectLoading: selectIsWeb3ServiceCreating,
} = createQuerySelectors({ endpoint: createWeb3Service, fallback: false });
