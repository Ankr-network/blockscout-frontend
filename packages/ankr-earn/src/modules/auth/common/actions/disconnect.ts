import { getProviderManager } from 'modules/api/getProviderManager';
import { web3Api } from 'modules/api/web3Api';

import { AvailableStakingWriteProviders } from '../../../common/types';
import { resetProvider } from '../store/authSlice';

export const { useDisconnectMutation } = web3Api.injectEndpoints({
  endpoints: build => ({
    disconnect: build.mutation<boolean, AvailableStakingWriteProviders>({
      queryFn: async providerId => {
        const providerManager = getProviderManager();
        providerManager.disconnect(providerId);
        return {
          data: true,
        };
      },
      async onQueryStarted(arg, { dispatch }) {
        dispatch(
          resetProvider({
            providerId: arg,
          }),
        );
      },
    }),
  }),
});
