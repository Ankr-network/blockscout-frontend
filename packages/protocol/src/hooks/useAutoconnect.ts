import { useOauth } from 'domains/oauth/hooks/useOauth';
import { useOnMount } from 'modules/common/hooks/useOnMount';

import { useAuth } from '../domains/auth/hooks/useAuth';

export const useAutoconnect = () => {
  const {
    handleAutoconnect,
    authorizationToken,
    walletMeta,
    hasOauthLogin,
    hasWeb3Connection,
  } = useAuth();
  const { handleLogin } = useOauth();

  useOnMount(() => {
    const login = () => {
      if (hasOauthLogin) {
        handleLogin();
      }

      if (hasWeb3Connection) {
        handleAutoconnect(walletMeta?.id ?? '');
      }
    };

    if (authorizationToken) {
      login();
    }
  });
};
