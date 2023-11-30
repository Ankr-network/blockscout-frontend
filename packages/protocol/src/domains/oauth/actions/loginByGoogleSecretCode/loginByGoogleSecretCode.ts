import { EthAddressType, OauthLoginProvider } from 'multirpc-sdk';
import { t } from '@ankr.com/common';

import { MultiService } from 'modules/api/MultiService';
import { web3Api } from 'store/queries';
import { RootState } from 'store';
import { selectAuthData } from 'domains/auth/store/authSlice';
import { createQueryFnWithErrorHandler } from 'store/utils/createQueryFnWithErrorHandler';

import {
  OauthRedirectionURLState,
  bindAccountToLoggedInUser,
  buildSecretCodeData,
  getEthUserAddress,
  getSecreteCodeAndState,
} from './loginByGoogleSecretCodeUtils';

export type EmptyObject = Record<string, unknown>;

export interface LoginBySecretCodeResult {
  address: string;
  authorizationToken: string;
  encryptionPublicKey?: string;
  ethAddressType: EthAddressType;
  provider?: OauthLoginProvider;
}

const getLoginData = async ({
  code,
  state,
  provider,
}: OauthRedirectionURLState) => {
  if (!code) {
    throw new Error(t('oauth.secret-code-error'));
  }

  const secretCodeData = buildSecretCodeData(code, state || '');
  const service = MultiService.getService();

  if (!provider) {
    return service
      .getAccountingGateway()
      .loginUserByGoogleSecretCode(secretCodeData);
  }

  return service
    .getAccountingGateway()
    .loginBySecretCode(secretCodeData, { provider });
};

export const {
  endpoints: { oauthLoginByGoogleSecretCode },
  useLazyOauthLoginByGoogleSecretCodeQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    oauthLoginByGoogleSecretCode: build.query<LoginBySecretCodeResult, void>({
      queryFn: createQueryFnWithErrorHandler({
        queryFn: async (_arg, { getState }) => {
          const service = MultiService.getService();
          const { code, state, provider, error } = getSecreteCodeAndState();

          if (error) {
            throw new Error(error);
          }

          let { authorizationToken } = selectAuthData(getState() as RootState);

          if (authorizationToken) {
            service.getAccountingGateway().addToken(authorizationToken);

            await bindAccountToLoggedInUser({
              code,
              state,
              provider,
            });
          } else {
            const { access_token: accessToken } = await getLoginData({
              code,
              state,
              provider,
            });

            authorizationToken = accessToken;
          }

          const { addresses } = await service
            .getAccountingGateway()
            .getETHAddresses(authorizationToken);

          const ethUserAddress = getEthUserAddress(addresses);

          if (!ethUserAddress) {
            throw new Error(t('oauth.eth-address-error'));
          }

          const {
            address,
            type: ethAddressType,
            public_key: encryptionPublicKey,
          } = ethUserAddress;

          const web3ReadService = await MultiService.getWeb3ReadService();

          web3ReadService.getAccountingGateway().addToken(authorizationToken);
          service.getAccountingGateway().addToken(authorizationToken);
          service.getEnterpriseGateway().addToken(authorizationToken);

          return {
            data: {
              address,
              authorizationToken,
              encryptionPublicKey,
              ethAddressType,
              provider: provider || undefined,
            },
          };
        },
        errorHandler: error => {
          return {
            error,
          };
        },
      }),
    }),
  }),
});
