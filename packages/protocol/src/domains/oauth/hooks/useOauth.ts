import {
  OauthAutoLoginResult,
  useLazyOauthAutoLoginQuery,
} from '../actions/autoLogin';
import { useLazyOauthLoginByGoogleSecretCodeQuery } from '../actions/loginByGoogleSecretCode';
import { useLazyOauthLoginJwtQuery } from '../actions/loginByGoogleSecretCode/oauthLoginJwt';
import { useLazyOauthSignoutQuery } from '../actions/signout';

export interface OAuth {
  data?: OauthAutoLoginResult;
  handleLogin: () => void;
  handleSignout: () => void;
  loading: boolean;
}

export const useOauth = (): OAuth => {
  const [handleLogin, { data, isLoading: autoLoginLoading }] =
    useLazyOauthAutoLoginQuery();

  const [handleSignout] = useLazyOauthSignoutQuery();
  const [, { isLoading: loginUserLoading1 }] =
    useLazyOauthLoginByGoogleSecretCodeQuery();
  const [, { isLoading: loginUserLoading2 }] = useLazyOauthLoginJwtQuery();

  return {
    data,
    handleLogin,
    handleSignout,
    loading: autoLoginLoading || loginUserLoading1 || loginUserLoading2,
  };
};
