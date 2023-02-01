import { getProviderManager } from 'modules/api/getProviderManager';
import { getOnErrorWithCustomText } from 'modules/api/utils/getOnErrorWithCustomText';
import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';

import { AvailableStakingWriteProviders } from '../../../common/types';
import { resetProvider } from '../store/authSlice';

// todo: STAKAN-2484 translations are not initialized at the moment, so we use a constant
const ERROR_TEXT = 'Failed to disconnect the wallet';

export const { useDisconnectMutation } = web3Api.injectEndpoints({
  endpoints: build => ({
    disconnect: build.mutation<boolean, AvailableStakingWriteProviders>({
      queryFn: queryFnNotifyWrapper<
        AvailableStakingWriteProviders,
        never,
        boolean
      >(async providerId => {
        const providerManager = getProviderManager();
        providerManager.disconnect(providerId);
        return { data: true };
      }, getOnErrorWithCustomText(ERROR_TEXT)),

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
