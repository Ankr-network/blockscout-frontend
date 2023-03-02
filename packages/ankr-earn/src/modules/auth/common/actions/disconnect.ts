import { t } from '@ankr.com/common';

import { getProviderManager } from 'modules/api/getProviderManager';
import { getExtendedErrorText } from 'modules/api/utils/getExtendedErrorText';
import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';

import { AvailableStakingWriteProviders } from '../../../common/types';
import { resetProvider } from '../store/authSlice';

export const { useDisconnectMutation } = web3Api.injectEndpoints({
  endpoints: build => ({
    disconnect: build.mutation<boolean, AvailableStakingWriteProviders>({
      queryFn: queryFnNotifyWrapper<
        AvailableStakingWriteProviders,
        never,
        boolean
      >(
        async providerId => {
          const providerManager = getProviderManager();
          providerManager.disconnect(providerId);
          return { data: true };
        },
        error =>
          getExtendedErrorText(error, t('common.errors.disconnect-failed')),
      ),

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
