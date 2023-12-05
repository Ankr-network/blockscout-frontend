import { EthAddressType, OauthLoginProvider } from 'multirpc-sdk';
import { push } from 'connected-react-router';

import { GetState, RootState } from 'store';
import { TwoFAQueryFnParams } from 'store/queries/types';
import { createQueryFnWithErrorHandler } from 'store/utils/createQueryFnWithErrorHandler';
import { trackWeb2SignUpFailure } from 'modules/analytics/mixpanel/trackWeb2SignUpFailure';
import { web3Api } from 'store/queries';
import { AccountRoutesConfig } from 'domains/account/Routes';
import { ProjectsRoutesConfig } from 'domains/projects/routes/routesConfig';
import { selectAuthData } from 'domains/auth/store/authSlice';

import { oauthLoginByGoogleSecretCode } from './loginByGoogleSecretCode';
import { loginUserJwt } from './loginUserJwt';
import { loginSyntheticJwt } from './loginSyntheticJwtToken';
import {
  getTrackingParams,
  trackLoginSuccess,
} from './loginByGoogleSecretCodeUtils';
import { setGithubLoginNameAndEmail } from '../setGithubLoginNameAndEmail';

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
            await loginSyntheticJwt(
              dispatch,
              {
                ...authData,
                address,
                authorizationToken,
                encryptionPublicKey,
                ethAddressType,
                oauthProviders,
              },
              totp,
            );
          }

          if (ethAddressType === EthAddressType.User) {
            await loginUserJwt(
              dispatch,
              {
                address,
                authorizationToken,
                encryptionPublicKey,
                ethAddressType,
                oauthProviders,
              },
              totp,
            );
          }

          await trackLoginSuccess({ getState });

          return { data: {} };
        },
        errorHandler: (error, _args, { getState, dispatch }) => {
          trackWeb2SignUpFailure(getTrackingParams(getState as GetState));

          dispatch(push(AccountRoutesConfig.accountDetails.generatePath()));

          return {
            error,
          };
        },
      }),
      onQueryStarted: async (_arg, { dispatch, queryFulfilled }) => {
        await queryFulfilled;

        await dispatch(setGithubLoginNameAndEmail.initiate());

        dispatch(push(ProjectsRoutesConfig.projects.generatePath()));
      },
    }),
  }),
});
