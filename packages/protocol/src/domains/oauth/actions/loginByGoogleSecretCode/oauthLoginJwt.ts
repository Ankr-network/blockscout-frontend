import { EthAddressType, OauthLoginProvider } from 'multirpc-sdk';
import { push } from 'connected-react-router';

import { GetState, RootState } from 'store';
import { TwoFAQueryFnParams } from 'store/queries/types';
import { createQueryFnWithErrorHandler } from 'store/utils/createQueryFnWithErrorHandler';
import { trackWeb2SignUpFailure } from 'modules/analytics/mixpanel/trackWeb2SignUpFailure';
import { web3Api } from 'store/queries';
import { AccountRoutesConfig } from 'domains/account/Routes';
import { selectAuthData } from 'domains/auth/store/authSlice';

import { oauthLoginByGoogleSecretCode } from './loginByGoogleSecretCode';
import { loginUserJwt } from './loginUserJwt';
import { loginSyntheticJwt } from './loginSyntheticJwtToken';
import {
  getTrackingParams,
  trackLoginSuccess,
} from './loginByGoogleSecretCodeUtils';
import { setGithubLoginNameAndEmail } from '../setGithubLoginNameAndEmail';
import { redirectAfterLogin } from '../../../auth/actions/utils/redirectAfterLogin';

export type EmptyObject = Record<string, unknown>;

export interface OauthLoginByGoogleSecretCodeParams {
  group?: string;
}

export const {
  endpoints: { oauthLoginJwt },
  useLazyOauthLoginJwtQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    oauthLoginJwt: build.query<
      EmptyObject,
      TwoFAQueryFnParams<OauthLoginByGoogleSecretCodeParams>
    >({
      queryFn: createQueryFnWithErrorHandler({
        queryFn: async ({ totp }, { dispatch, getState }) => {
          const {
            data: {
              address,
              authorizationToken,
              encryptionPublicKey,
              ethAddressType,
              provider = OauthLoginProvider.Google,
            } = {},
          } = oauthLoginByGoogleSecretCode.select(undefined as any)(
            getState() as RootState,
          );

          const authData = selectAuthData(getState() as RootState);

          const oauthProviders: OauthLoginProvider[] = Array.isArray(
            authData?.oauthProviders,
          )
            ? [...authData.oauthProviders, provider]
            : [provider];

          if (ethAddressType === EthAddressType.Generated) {
            await loginSyntheticJwt({
              dispatch,
              authData: {
                ...authData,
                authAddress: address,
                authAddressType: ethAddressType,
                authorizationToken,
                encryptionPublicKey,
                oauthProviders,
              },
              totp,
            });
          }

          if (ethAddressType === EthAddressType.User) {
            await loginUserJwt({
              dispatch,
              authData: {
                authAddress: address,
                authAddressType: ethAddressType,
                authorizationToken,
                encryptionPublicKey,
                oauthProviders,
              },
              totp,
            });
          }

          await trackLoginSuccess({ getState });

          return { data: {} };
        },
        errorHandler: (error, _args, { dispatch, getState }) => {
          trackWeb2SignUpFailure(getTrackingParams(getState as GetState));

          dispatch(push(AccountRoutesConfig.accountDetails.generatePath()));

          return {
            error,
          };
        },
      }),
      onQueryStarted: async (_arg, { dispatch, getState, queryFulfilled }) => {
        await queryFulfilled;

        await dispatch(setGithubLoginNameAndEmail.initiate());

        redirectAfterLogin(dispatch, getState() as RootState);
      },
    }),
  }),
});
