import { GetState } from 'store';
import { INJECTED_WALLET_ID, MultiService } from 'modules/api/MultiService';
import {
  IConnect,
  disconnectService,
  getCachedData,
  loginAndCache,
  switchChain,
} from './connectUtils';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { resetAuthData, setAuthData } from '../store/authSlice';
import { web3Api } from 'store/queries';

export interface AuthConnectParams {
  isManualConnected?: boolean;
  walletId: string;
}

export const {
  useLazyAuthConnectQuery,
  endpoints: { authConnect },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    authConnect: build.query<IConnect, AuthConnectParams>({
      queryFn: createNotifyingQueryFn(
        async ({ isManualConnected, walletId }, { dispatch, getState }) => {
          dispatch(
            setAuthData({
              isManualConnected: !!isManualConnected,
            }),
          );

          const web3Service = await MultiService.createWeb3Service(walletId);
          const service = MultiService.getService();

          if (walletId === INJECTED_WALLET_ID) {
            await switchChain();
          }

          const cachedData = getCachedData(service, getState as GetState);

          const { hasWeb3Connection, address } = cachedData;
          let { hasOauthLogin } = cachedData;

          if (hasWeb3Connection) return { data: cachedData };

          const provider = web3Service.getKeyProvider();
          const { currentAccount: providerAddress } = provider;

          if (
            address &&
            providerAddress.toLowerCase() !== address?.toLowerCase()
          ) {
            dispatch(resetAuthData());

            hasOauthLogin = false;
          }

          const authData = await loginAndCache(
            web3Service,
            service,
            dispatch,
            hasOauthLogin,
          );

          return { data: authData };
        },
      ),
      onQueryStarted: async (_args, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;
        } catch (error) {
          disconnectService();

          dispatch(resetAuthData());
        }
      },
    }),
  }),
});
