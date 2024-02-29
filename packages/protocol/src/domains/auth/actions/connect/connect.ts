import { EWalletId } from '@ankr.com/provider';

import { MultiService } from 'modules/api/MultiService';
import { getProviderManager } from 'modules/api/getProviderManager';
import { GetState } from 'store';
import { web3Api } from 'store/queries';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';

import {
  getCachedData,
  setWeb3UserAuthorizationToken,
} from './makeAuthorization';
import { IAuthSlice, resetAuthData } from '../../store/authSlice';
import { createWeb3Service } from './createWeb3Service';
import { AuthConnectParams } from './types';

interface AuthConnectResult {
  cachedData: IAuthSlice;
  hasWeb3Connection?: boolean;
  hasOauthLogin?: boolean;
}

export const {
  endpoints: { authConnect },
  useLazyAuthConnectQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    authConnect: build.query<AuthConnectResult, AuthConnectParams>({
      queryFn: createNotifyingQueryFn(async (arg, { dispatch, getState }) => {
        const service = MultiService.getService();

        const { error } = await dispatch(createWeb3Service.initiate(arg));

        if (error) {
          throw error;
        }

        const cachedData = getCachedData(service, getState as GetState);

        const { hasWeb3Connection, address: cachedAddress } = cachedData;
        let { hasOauthLogin } = cachedData;

        const providerManager = getProviderManager();
        const provider = await providerManager.getETHWriteProvider(
          EWalletId.injected,
        );

        const { currentAccount: providerAddress } = provider;

        if (
          cachedAddress &&
          providerAddress.toLowerCase() !== cachedAddress?.toLowerCase()
        ) {
          dispatch(resetAuthData());

          hasOauthLogin = false;
        }

        if (!hasOauthLogin) {
          await setWeb3UserAuthorizationToken(service, dispatch);
        }

        return {
          data: { cachedData, hasWeb3Connection, hasOauthLogin },
        };
      }),
    }),
  }),
});
