import { useOauth } from 'domains/oauth/hooks/useOauth';
import { useOnMount } from 'modules/common/hooks/useOnMount';
import { useAuth } from 'domains/auth/hooks/useAuth';

export const useAutoconnect = () => {
  const {
    authorizationToken,
    handleAutoconnect,
    hasOauthLogin,
    hasWeb3Connection,
    walletMeta,
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
