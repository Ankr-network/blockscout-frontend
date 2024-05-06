import { useMemo } from 'react';

import { useAuth } from 'domains/auth/hooks/useAuth';

import { getAccountName } from '../utils/getAccountName';

export const usePersonalAccountButton = () => {
  const {
    address,
    email,
    hasOauthLogin,
    hasWeb3Connection,
    hasOauthWithoutWeb3,
    loginName,
    oauthProviders: [oauthProvider] = [undefined],
  } = useAuth();

  const withoutWeb3WithoutOauth = !hasOauthLogin && !hasWeb3Connection;

  const accountName = useMemo(
    () =>
      getAccountName({
        address,
        email,
        hasOauthWithoutWeb3,
        loginName,
        oauthProvider,
      }),
    [address, email, hasOauthWithoutWeb3, loginName, oauthProvider],
  );

  return {
    accountName,
    email,
    hasOauthWithoutWeb3,
    oauthProvider,
    withoutWeb3WithoutOauth,
  };
};
