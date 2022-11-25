import { useAppSelector } from 'store/useAppSelector';
import { selectAuthData } from '../store/authSlice';
import { useOauth } from 'domains/oauth/hooks/useOauth';
import { useWeb3Connection } from './useWeb3Connection';

export const useAuth = () => {
  const authData = useAppSelector(selectAuthData);

  const {
    loading: web3ConnectionLoading,
    connectData,
    ...rest
  } = useWeb3Connection();

  const { loading: autologinLoading, ...oauthRest } = useOauth();

  const { hasOauthLogin, hasWeb3Connection } = authData;

  return {
    loading: web3ConnectionLoading || autologinLoading,
    ...rest,
    ...authData,
    ...oauthRest,
    credentials: authData.hasWeb3Connection
      ? connectData?.credentials
      : authData?.credentials,
    isLoggedIn: Boolean(hasOauthLogin || hasWeb3Connection),
  };
};
