import { EthAddressType } from 'multirpc-sdk';
import { t } from '@ankr.com/common';

import { GetState } from 'store';
import { MultiService } from 'modules/api/MultiService';
import {
  buildSecretCodeData,
  getEthUserAddress,
  getSecreteCodeAndState,
  getTrackingParams,
  trackLoginSuccess,
} from './loginByGoogleSecretCodeUtils';
import { createQueryFnWithErrorHandler } from 'store/utils/createQueryFnWithErrorHandler';
import { getAxiosAccountErrorMessage } from 'store/utils/getAxiosAccountErrorMessage';
import { isAxiosAccountError } from 'store/utils/isAxiosAccountError';
import { trackWeb2ConnectFailure } from 'modules/analytics/mixpanel/trackWeb2ConnectFailure';
import { userSettingsGetActiveEmailBinding } from 'domains/userSettings/actions/email/getActiveEmailBinding';
import { web3Api } from 'store/queries';
import { loginSyntheticJwt } from './loginSyntheticJwtToken';
import { loginUserJwt } from './loginUserJwt';

export type EmptyObject = Record<string, unknown>;

export const {
  endpoints: { oauthLoginByGoogleSecretCode },
  useLazyOauthLoginByGoogleSecretCodeQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    oauthLoginByGoogleSecretCode: build.query<EmptyObject, void>({
      queryFn: createQueryFnWithErrorHandler({
        queryFn: async (_args, { dispatch, getState }) => {
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

          if (ethAddressType === EthAddressType.Generated) {
            await loginSyntheticJwt(dispatch, {
              address,
              authorizationToken,
              encryptionPublicKey,
              ethAddressType,
            });
          }

          if (ethAddressType === EthAddressType.User) {
            await loginUserJwt(dispatch, {
              address,
              authorizationToken,
              encryptionPublicKey,
              ethAddressType,
            });
          }

          await dispatch(
            userSettingsGetActiveEmailBinding.initiate({
              params: undefined as void,
              shouldNotify: false,
            }),
          );

          await trackLoginSuccess({ dispatch, getState });

          return { data: {} };
        },
        errorHandler: (error, _args, { getState }) => {
          trackWeb2ConnectFailure(getTrackingParams(getState as GetState));

          if (isAxiosAccountError(error)) {
            return { error: getAxiosAccountErrorMessage(error) };
          }

          return {
            error: new Error(t('oauth.secret-code-error')),
          };
        },
      }),
    }),
  }),
});
