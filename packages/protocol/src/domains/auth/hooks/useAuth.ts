import { selectAuthData } from '../store/authSlice';
import { useAppSelector } from 'store/useAppSelector';
import { useOauth } from 'domains/oauth/hooks/useOauth';
import { useWeb3Connection } from './useWeb3Connection';
import { EthAddressType } from 'multirpc-sdk';

export const useAuth = () => {
  const authData = useAppSelector(selectAuthData);

  const {
    loading: web3ConnectionLoading,
    connectData,
    ...rest
  } = useWeb3Connection();

  const { loading: autologinLoading, ...oauthRest } = useOauth();

  const {
    hasOauthLogin,
    hasWeb3Connection,
    ethAddressType,
    credentials,
    hasOauthUserDepositTransaction,
    workerTokenData,
  } = authData;

  const hasPremium = Boolean(credentials || hasOauthUserDepositTransaction);

  return {
    loading: web3ConnectionLoading || autologinLoading,
    ...rest,
    ...authData,
    ...oauthRest,
    credentials: hasWeb3Connection
      ? connectData?.credentials
      : authData?.credentials,
    hasWeb3Connection: Boolean(hasWeb3Connection),
    isLoggedIn: Boolean(hasOauthLogin || hasWeb3Connection),
    isUserEthAddressType: ethAddressType === EthAddressType.User,
    hasPremium, // web3 premium user or gauth premium user have access to billing
    hasPrivateAccess: Boolean(
      credentials || workerTokenData?.userEndpointToken,
    ), // web3 premium user or any gauth user have access to private statistics
    hasInfrastructureAccess: Boolean(
      hasPremium && workerTokenData?.userEndpointToken,
    ), // web3 premium user with active premium or gauth premium user have access to infrastructure
  };
};
