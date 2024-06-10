import { useAuth } from 'domains/auth/hooks/useAuth';
import { useOauth } from 'domains/oauth/hooks/useOauth';
import { useOnMount } from 'modules/common/hooks/useOnMount';

export const useAutologin = () => {
  const { authorizationToken, hasOauthLogin } = useAuth();

  const { handleLogin } = useOauth();

  useOnMount(() => {
    if (authorizationToken && hasOauthLogin) {
      handleLogin();
    }
  });
};
