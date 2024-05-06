import { EthAddressType } from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';
import { RootState } from 'store';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { getWalletAddress } from 'domains/wallet/utils/getWalletAddress';
import { web3Api } from 'store/queries';

import { AuthConnectParams } from './types';
import {
  IAuthSlice,
  resetAuthData,
  selectAuthData,
  setAuthData,
} from '../../store/authSlice';
import { addAuthTokenToService } from '../utils/addAuthTokenToService';
import { addSignedWorkerTokenToService } from '../utils/addSignedWorkerTokenToService';
import { authAuthorizeProvider } from '../getAuthorizationToken';
import { createWeb3Service } from './createWeb3Service';

export interface AuthConnectResult {
  cachedAuthData: IAuthSlice;
  hasOauthLogin?: boolean;
  hasWeb3Connection?: boolean;
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

        const cachedAuthData = selectAuthData(getState() as RootState);
        const {
          authAddress: cachedAuthAddress,
          authorizationToken: authToken,
          hasWeb3Connection,
          workerTokenData,
        } = cachedAuthData;
        const signedWorkerToken = workerTokenData?.signedToken;

        addAuthTokenToService({ authToken, service });
        addSignedWorkerTokenToService({ service, signedWorkerToken });

        const providerAddress = await getWalletAddress();

        const shouldResetAuthData =
          Boolean(cachedAuthAddress) &&
          providerAddress.toLowerCase() !== cachedAuthAddress!.toLowerCase();

        if (shouldResetAuthData) {
          dispatch(resetAuthData());
        }

        const { hasOauthLogin } = selectAuthData(getState() as RootState);

        if (!hasOauthLogin) {
          const authorizationToken = await dispatch(
            authAuthorizeProvider.initiate(),
          ).unwrap();

          dispatch(
            setAuthData({
              authorizationToken,
              authAddressType: EthAddressType.User,
            }),
          );

          addAuthTokenToService({ authToken: authorizationToken, service });
        }

        return { data: { cachedAuthData, hasOauthLogin, hasWeb3Connection } };
      }),
    }),
  }),
});
