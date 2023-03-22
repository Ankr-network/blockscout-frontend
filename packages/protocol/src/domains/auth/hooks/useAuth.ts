import { selectAuthData, selectHasPremium } from '../store/authSlice';
import { useAppSelector } from 'store/useAppSelector';
import { useOauth } from 'domains/oauth/hooks/useOauth';
import { useWeb3Connection } from './useWeb3Connection';
import { EthAddressType } from 'multirpc-sdk';

export const useAuth = () => {
  const authData = useAppSelector(selectAuthData);
  const hasPremium = useAppSelector(selectHasPremium);

  const {
    loading: web3ConnectionLoading,
    connectData,
    ...rest
  } = useWeb3Connection();

  const { loading: autologinLoading, ...oauthRest } = useOauth();

  const {
    address = '',
    credentials,
    ethAddressType,
    hasOauthLogin,
    hasWeb3Connection,
    workerTokenData,
  } = authData;

  const isTokenExpired =
    credentials && !workerTokenData?.userEndpointToken && !hasOauthLogin;

  const isFreePremium = Boolean(
    !hasPremium && hasOauthLogin && workerTokenData?.userEndpointToken,
  );

  const hasPrivateAccess = Boolean(
    credentials || workerTokenData?.userEndpointToken,
  );

  const isUserEthAddressType = ethAddressType === EthAddressType.User;

  const hasConnectWalletMessage = Boolean(
    hasOauthLogin &&
      !hasWeb3Connection &&
      hasPrivateAccess &&
      isUserEthAddressType,
  );

  return {
    loading: web3ConnectionLoading || autologinLoading,
    ...rest,
    ...authData,
    ...oauthRest,
    address,
    credentials: hasWeb3Connection
      ? connectData?.credentials
      : authData?.credentials,
    hasWeb3Connection: Boolean(hasWeb3Connection),
    isLoggedIn: Boolean(hasOauthLogin || hasWeb3Connection),
    isUserEthAddressType,
    isTokenExpired,
    hasPremium, // web3 premium user or gauth premium user has access to billing
    isFreePremium, // gauth user with private endpoints, without topups
    hasPrivateAccess, // web3 premium user or any gauth user has access to private statistics
    hasInfrastructureAccess: Boolean(
      hasPremium && workerTokenData?.userEndpointToken,
    ), // web3 premium user with active premium or gauth premium user has access to infrastructure
    hasConnectWalletMessage,
  };
};
