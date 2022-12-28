import { useOauth } from 'domains/oauth/hooks/useOauth';
import { useOnMount } from 'modules/common/hooks/useOnMount';
import { useAuth } from './domains/auth/hooks/useAuth';

export const useAutoconnect = () => {
  const {
    handleConnect,
    authorizationToken,
    walletMeta,
    hasOauthLogin,
    hasWeb3Connection,
  } = useAuth();
  const { handleLogin } = useOauth();

  useOnMount(() => {
    const login = async () => {
      if (hasOauthLogin) {
        await handleLogin();
      }

      if (hasWeb3Connection) {
        await handleConnect(walletMeta?.id ?? '', true);
      }
    };

    if (authorizationToken) {
      login();
    }
  });
};
