import { RequestAction, RequestsStore } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { MultiService } from 'modules/api/MultiService';
import {
  buildSecretCodeData,
  getEthUserAddress,
  getSecreteCodeAndState,
} from './loginUserByGoogleSecretCodeUtils';
import { setAuthData } from 'domains/auth/store/authSlice';
import { EthAddressType } from 'multirpc-sdk';
import { getActiveEmailBinding } from 'domains/userSettings/actions/email/getActiveEmailBinding';

export const loginUser = createSmartAction<RequestAction>(
  'oauth/loginUser',
  () => ({
    request: {
      promise: (async () => null)(),
    },
    meta: {
      hideNotificationOnError: true,
      onRequest: (
        request: any,
        action: RequestAction,
        store: RequestsStore,
      ) => {
        return {
          promise: (async () => {
            const { code, state } = getSecreteCodeAndState();

            if (!code) {
              throw new Error('Wrong secrete code');
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

              store.dispatch(
                setAuthData({
                  credentials: jwtToken,
                  workerTokenData,
                  authorizationToken,
                  hasOauthLogin: true,
                  ethAddressType,
                  address,
                  encryptionPublicKey,
                }),
              );
            }

            if (ethAddressType === EthAddressType.User) {
              const jwtToken = await web3ReadService.getIssuedJwtToken(address);

              store.dispatch(
                setAuthData({
                  credentials: jwtToken,
                  authorizationToken,
                  hasOauthLogin: true,
                  ethAddressType,
                  address,
                  encryptionPublicKey,
                }),
              );
            }

            const { data } = await store.dispatchRequest(
              getActiveEmailBinding(),
            );

            store.dispatch(
              setAuthData({
                address:
                  ethAddressType === EthAddressType.User ? data?.address : '',
                email: data?.email,
              }),
            );
          })(),
        };
      },
      // eslint-disable-next-line
      onError: (_error, _action: RequestAction, _store: RequestsStore) => {
        throw new Error('Wrong secrete code. Try to sign up again');
      },
    },
  }),
);
