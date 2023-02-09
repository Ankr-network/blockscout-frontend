import { EWalletId } from '@ankr.com/provider';

import { GetState, RootState } from 'store';
import {
  IConnect,
  disconnectService,
  getCachedData,
  loginAndCache,
  switchChain,
} from './connectUtils';
import { INJECTED_WALLET_ID, MultiService } from 'modules/api/MultiService';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { resetAuthData, selectAuthData } from '../store/authSlice';
import { trackWeb3ConnectFailure } from 'modules/analytics/mixpanel/trackWeb3ConnectFailure';
import { trackWeb3ConnectSuccess } from 'modules/analytics/mixpanel/trackWeb3ConnectSuccess';
import { web3Api } from 'store/queries';

export interface AuthConnectParams {
  walletId: string;
}

export const {
  endpoints: { authConnect },
  useLazyAuthConnectQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    authConnect: build.query<IConnect, AuthConnectParams>({
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

          const authData = await loginAndCache(
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
      onQueryStarted: async (_args, { dispatch, getState, queryFulfilled }) => {
        try {
          await queryFulfilled;
        } catch {
          disconnectService();

          dispatch(resetAuthData());

          const { trackingWalletName: walletName } = selectAuthData(
            getState() as RootState,
          );

          trackWeb3ConnectFailure({ walletName: walletName! });
        }
      },
    }),
  }),
});