import { createSelector } from '@reduxjs/toolkit';

import { oauthAutoLogin } from '../actions/autoLogin';
import { oauthLoginJwt } from '../actions/loginByGoogleSecretCode/oauthLoginJwt';
import { oauthLoginByGoogleSecretCode } from '../actions/loginByGoogleSecretCode';

export const selectIsLoggingInViaOauth = createSelector(
  oauthAutoLogin.select(),
  oauthLoginJwt.select(undefined as never),
  oauthLoginByGoogleSecretCode.select(),
  (
    { isLoading: isAutoLoggingIn },
    { isLoading: isLoggingInJWT },
    { isLoading: isLoggingInByGoogleSecretCode },
  ) => isAutoLoggingIn || isLoggingInJWT || isLoggingInByGoogleSecretCode,
);
