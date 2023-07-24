import { EthAddressType } from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';
import { web3Api } from 'store/queries';

import {
  buildSecretCodeData,
  getEthUserAddress,
  getSecreteCodeAndState,
} from './loginByGoogleSecretCodeUtils';

export type EmptyObject = Record<string, unknown>;

export interface LoginByGoogleSecretCodeResult {
  address: string;
  authorizationToken: string;
  encryptionPublicKey?: string;
  ethAddressType: EthAddressType;
}

export const {
  endpoints: { oauthLoginByGoogleSecretCode },
  useLazyOauthLoginByGoogleSecretCodeQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    oauthLoginByGoogleSecretCode: build.query<
      LoginByGoogleSecretCodeResult,
      void
    >({
      queryFn: async () => {
        const { code, state } = getSecreteCodeAndState();

        if (!code) {
          throw new Error('Wrong secret code');
        }

        const secretCodeData = buildSecretCodeData(code, state || '');

        const service = MultiService.getService();

        const loginUserByGoogleSecretCodeResult = await service
          .getOauthGateway()
          .loginUserByGoogleSecretCode(secretCodeData);

        const { access_token: authorizationToken } =
          loginUserByGoogleSecretCodeResult;

        const { addresses } = await service
          .getOauthGateway()
          .getETHAddresses(authorizationToken);

        const ethUserAddress = getEthUserAddress(addresses);

        if (!ethUserAddress) {
          throw new Error('No ethUserAddress');
        }

        const {
          address,
          type: ethAddressType,
          public_key: encryptionPublicKey,
        } = ethUserAddress;

        const web3ReadService = await MultiService.getWeb3ReadService();

        web3ReadService.getOauthGateway().addToken(authorizationToken);
        service.getOauthGateway().addToken(authorizationToken);
        service.getAccountGateway().addToken(authorizationToken);

        return {
          data: {
            address,
            authorizationToken,
            encryptionPublicKey,
            ethAddressType,
          },
        };
      },
    }),
  }),
});
