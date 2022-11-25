import {
  RequestAction,
  RequestsStore,
  resetRequests,
} from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { INJECTED_WALLET_ID, MultiService } from 'modules/api/MultiService';
import { withStore } from '../utils/withStore';
import {
  switchChain,
  disconnectService,
  getCachedData,
  IConnect,
  loginAndCache,
} from './connectUtils';
import { resetAuthData, setAuthData } from '../store/authSlice';

export const connect = createSmartAction<RequestAction<IConnect, IConnect>>(
  'auth/connect',
  (walletId: string, isManualConnected?: boolean) => ({
    request: {
      promise: async (store: RequestsStore) => {
        store.dispatch(
          setAuthData({
            isManualConnected,
          }),
        );

        const web3Service = await MultiService.createWeb3Service(walletId);
        const service = MultiService.getService();

        if (walletId === INJECTED_WALLET_ID) {
          await switchChain();
        }

        const cachedData = getCachedData(service, store);

        if (cachedData?.hasWeb3Connection) return cachedData;

        let hasOauthLogin = cachedData?.hasOauthLogin;

        const provider = web3Service.getKeyProvider();
        const { currentAccount: providerAddress } = provider;

        if (
          providerAddress.toLowerCase() !== cachedData?.address?.toLowerCase()
        ) {
          store.dispatch(resetAuthData());

          hasOauthLogin = false;
        }

        return loginAndCache(web3Service, service, store, hasOauthLogin);
      },
    },
    meta: {
      onRequest: withStore,
      onError: async (
        error: Error,
        _action: RequestAction,
        store: RequestsStore,
      ) => {
        disconnectService();

        store.dispatch(resetAuthData());
        store.dispatch(resetRequests([connect.toString()]));

        throw error;
      },
    },
  }),
);
