import { EWalletId, getWalletName } from '@ankr.com/provider';

import { GetState } from 'store';
import { disconnectService, switchChain } from './connectUtils';
import { getCachedData, makeAuthorization } from './makeAuthorization';
import { INJECTED_WALLET_ID, MultiService } from 'modules/api/MultiService';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { IAuthSlice, resetAuthData } from '../../store/authSlice';
import { trackWeb3ConnectFailure } from 'modules/analytics/mixpanel/trackWeb3ConnectFailure';
import { trackWeb3ConnectSuccess } from 'modules/analytics/mixpanel/trackWeb3ConnectSuccess';
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

          if (hasWeb3Connection) return { data: cachedData };

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

          const {
            address,
            credentials,
            trackingWalletName: walletName,
          } = authData;

          trackWeb3ConnectSuccess({
            address,
            credentials,
            walletName: walletName!,
          });

          return { data: authData };
        },
      ),
      onQueryStarted: async ({ walletId }, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;
        } catch {
          trackWeb3ConnectFailure({
            walletName: getWalletName(walletId as EWalletId),
          });

          disconnectService();

          dispatch(resetAuthData());
        }
      },
    }),
  }),
});
