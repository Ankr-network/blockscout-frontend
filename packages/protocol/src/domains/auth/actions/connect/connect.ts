import { EWalletId, getWalletName } from '@ankr.com/provider';

import { GetState, RootState } from 'store';
import { disconnectService, switchChain } from './connectUtils';
import { getCachedData, makeAuthorization } from './makeAuthorization';
import { INJECTED_WALLET_ID, MultiService } from 'modules/api/MultiService';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { IAuthSlice, resetAuthData, setAuthData } from '../../store/authSlice';
import { selectHasPremium } from 'domains/auth/store/selectors';
import { trackWeb3SignUpFailure } from 'modules/analytics/mixpanel/trackWeb3SignUpFailure';
import { trackWeb3SignUpSuccess } from 'modules/analytics/mixpanel/trackWeb3SignUpSuccess';
import { web3Api } from 'store/queries';
import { AuthConnectParams } from './types';

export const {
  endpoints: { authConnect },
  useLazyAuthConnectQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    authConnect: build.query<IAuthSlice, AuthConnectParams>({
      queryFn: createNotifyingQueryFn(
        async ({ walletId }, { dispatch, getState }) => {
          const web3Service = await MultiService.createWeb3Service(walletId);
          const service = MultiService.getService();

          if (walletId === INJECTED_WALLET_ID) {
            try {
              await switchChain();
            } catch (error) {
              dispatch(resetAuthData());

              throw error;
            }
          }

          const cachedData = getCachedData(service, getState as GetState);

          const { hasWeb3Connection, address: cachedAddress } = cachedData;
          let { hasOauthLogin } = cachedData;

          if (hasWeb3Connection) {
            dispatch(setAuthData({ hasWeb3Autoconnect: true }));

            return { data: cachedData };
          }

          const provider = web3Service.getKeyProvider();
          const { currentAccount: providerAddress } = provider;

          if (
            cachedAddress &&
            providerAddress.toLowerCase() !== cachedAddress?.toLowerCase()
          ) {
            dispatch(resetAuthData());

            hasOauthLogin = false;
          }

          const authData = await makeAuthorization(
            web3Service,
            service,
            dispatch,
            walletId as EWalletId,
            hasOauthLogin,
          );

          const { address, trackingWalletName: walletName } = authData;

          const hasPremium = selectHasPremium(getState() as RootState);

          trackWeb3SignUpSuccess({
            address,
            hasPremium,
            walletName: walletName!,
          });

          return { data: authData };
        },
      ),
      onQueryStarted: async ({ walletId }, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;
        } catch {
          trackWeb3SignUpFailure({
            walletName: getWalletName(walletId as EWalletId),
          });

          disconnectService();

          dispatch(resetAuthData());
        }
      },
    }),
  }),
});
