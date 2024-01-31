import { useMemo } from 'react';

import { useAuth } from 'domains/auth/hooks/useAuth';

import { getAccountName } from '../utils/getAccountName';

export const usePersonalAccountButton = () => {
  const {
    address,
    email,
    hasOauthLogin,
    hasWeb3Connection,
    loginName,
    oauthProviders: [oauthProvider] = [undefined],
  } = useAuth();

  const hasOauthWithoutWeb3 = Boolean(hasOauthLogin && !hasWeb3Connection);
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
