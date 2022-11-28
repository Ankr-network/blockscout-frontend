import { ProviderManagerSingleton } from '@ankr.com/staking-sdk';

import { web3Api } from 'modules/api/web3Api';

import { AvailableStakingWriteProviders } from '../../../common/types';
import { setProviderStatus } from '../store/authSlice';

export const { useDisconnectMutation } = web3Api.injectEndpoints({
  endpoints: build => ({
    disconnect: build.mutation<boolean, AvailableStakingWriteProviders>({
      queryFn: async providerId => {
        const providerManager = ProviderManagerSingleton.getInstance();
        providerManager.disconnect(providerId);
        return {
          data: true,
        };
      },
      async onQueryStarted(arg, { dispatch }) {
        dispatch(
          setProviderStatus({
            providerId: arg,
            isActive: false,
            address: undefined,
            walletId: undefined,
            wallet: undefined,
            walletIcon: undefined,
            walletName: undefined,
          }),
        );
      },
    }),
  }),
});
