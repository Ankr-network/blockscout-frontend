import { EthAddressType } from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';
import {
  buildSecretCodeData,
  getEthUserAddress,
  getSecreteCodeAndState,
} from './loginByGoogleSecretCodeUtils';
import { createQueryFnWithErrorHandler } from 'store/utils/createQueryFnWithErrorHandler';
import { getAxiosAccountErrorMessage } from 'store/utils/getAxiosAccountErrorMessage';
import { isAxiosAccountError } from 'store/utils/isAxiosAccountError';
import { setAuthData } from 'domains/auth/store/authSlice';
import { userSettingsGetActiveEmailBinding } from 'domains/userSettings/actions/email/getActiveEmailBinding';
import { web3Api } from 'store/queries';

export type EmptyObject = Record<string, unknown>;

export const {
  endpoints: { oauthLoginByGoogleSecretCode },
  useLazyOauthLoginByGoogleSecretCodeQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    oauthLoginByGoogleSecretCode: build.query<EmptyObject, void>({
      queryFn: createQueryFnWithErrorHandler({
        queryFn: async (_args, { dispatch }) => {
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
            throw new Error('No ethUserAd dress');
          }

          const {
            address,
            type: ethAddressType,
            public_key: encryptionPublicKey,
          } = ethUserAddress;

          const web3ReadService = await MultiService.getWeb3ReadService();

          web3ReadService.getOauthGateway().addToken(authorizationToken);
          service.getAccountGateway().addToken(authorizationToken);

          if (ethAddressType === EthAddressType.Generated) {
            const { jwtToken, workerTokenData } =
              await web3ReadService.getIssuedJwtTokenOrIssue(
                ethUserAddress?.address as string,
                ethUserAddress?.public_key as string,
              );

            if (workerTokenData?.signedToken) {
              service
                .getWorkerGateway()
                .addJwtToken(workerTokenData?.signedToken);
            }

            dispatch(
              setAuthData({
                address,
                authorizationToken,
                credentials: jwtToken,
                encryptionPublicKey,
                ethAddressType,
                hasOauthLogin: true,
                workerTokenData,
              }),
            );
          }

          if (ethAddressType === EthAddressType.User) {
            const jwtToken = await web3ReadService.getIssuedJwtToken(address);

            dispatch(
              setAuthData({
                address,
                authorizationToken,
                credentials: jwtToken,
                encryptionPublicKey,
                ethAddressType,
                hasOauthLogin: true,
              }),
            );
          }

          const { data } = await dispatch(
            userSettingsGetActiveEmailBinding.initiate({
              params: undefined as void,
              shouldNotify: false,
            }),
          );

          dispatch(
            setAuthData({
              address:
                ethAddressType === EthAddressType.User ? data?.address : '',
              email: data?.email,
            }),
          );

          return { data: {} };
        },
        errorHandler: error => {
          if (isAxiosAccountError(error)) {
            return { error: getAxiosAccountErrorMessage(error) };
          }

          return {
            error: new Error('Wrong secret code. Try to sign up again'),
          };
        },
      }),
    }),
  }),
});