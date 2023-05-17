import { GetState } from 'store';
import { IAuthSlice, resetAuthData } from '../../store/authSlice';
import { MultiService } from 'modules/api/MultiService';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import {
  getCachedData,
  setWeb3UserAuthorizationToken,
} from './makeAuthorization';
import { web3Api } from 'store/queries';
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

        const web3Service = await MultiService.getWeb3Service();

        const cachedData = getCachedData(service, getState as GetState);

        const { hasWeb3Connection, address: cachedAddress } = cachedData;
        let { hasOauthLogin } = cachedData;

        const provider = web3Service.getKeyProvider();
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
