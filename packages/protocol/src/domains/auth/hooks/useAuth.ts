import { selectAuthData } from '../store/authSlice';
import {
  selectHasConnectWalletMessage,
  selectHasFreemium,
  selectHasFreeToPremiumTransition,
  selectHasInfrastructureAccess,
  selectHasPremium,
  selectHasPremiumToFreeTransition,
  selectHasPrivateAccess,
  selectHasStatusTransition,
  selectHasUserEndpointToken,
  selectHasWeb3Connection,
  selectIsLoggedIn,
  selectIsOldPremium,
  selectIsTokenExpired,
  selectIsUserEthAddressType,
  selectPremiumUntilDate,
} from '../store/selectors';
import { useAppSelector } from 'store/useAppSelector';
import { useOauth } from 'domains/oauth/hooks/useOauth';
import { useWeb3Connection } from './useWeb3Connection';
import { usePremiumStatus } from './usePremiumStatus';

export const useAuth = () => {
  const authData = useAppSelector(selectAuthData);

  const hasConnectWalletMessage = useAppSelector(selectHasConnectWalletMessage);
  const hasFreeToPremiumTransition = useAppSelector(
    selectHasFreeToPremiumTransition,
  );
  const hasInfrastructureAccess = useAppSelector(selectHasInfrastructureAccess);
  const hasPremium = useAppSelector(selectHasPremium);
  const hasPremiumToFreeTransition = useAppSelector(
    selectHasPremiumToFreeTransition,
  );
  const hasPrivateAccess = useAppSelector(selectHasPrivateAccess);
  const hasStatusTransition = useAppSelector(selectHasStatusTransition);
  const hasUserEndpointToken = useAppSelector(selectHasUserEndpointToken);
  const hasWeb3Connection = useAppSelector(selectHasWeb3Connection);
  const isFreePremium = useAppSelector(selectHasFreemium);
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const isOldPremium = useAppSelector(selectIsOldPremium);
  const isTokenExpired = useAppSelector(selectIsTokenExpired);
  const isUserEthAddressType = useAppSelector(selectIsUserEthAddressType);
  const premiumUntil = useAppSelector(selectPremiumUntilDate);

  const {
    loading: web3ConnectionLoading,
    connectData,
    ...rest
  } = useWeb3Connection();

  const { loading: autologinLoading, ...oauthRest } = useOauth();

  const { isLoading: premiumStatusLoading } = usePremiumStatus();

  const { address = '' } = authData;

  return {
    loading: web3ConnectionLoading || autologinLoading || premiumStatusLoading,
    ...rest,
    ...authData,
    ...oauthRest,
    address,
    credentials: hasWeb3Connection
      ? connectData?.credentials
      : authData?.credentials,
    hasWeb3Connection: Boolean(hasWeb3Connection),
    isLoggedIn,
    isOldPremium,
    isUserEthAddressType,
    isTokenExpired,
    hasPremium, // web3 premium user or gauth premium user has access to billing
    isFreePremium, // gauth user with private endpoints, without topups
    hasUserEndpointToken,
    hasPrivateAccess, // web3 premium user or any gauth user has access to private statistics
    hasInfrastructureAccess, // web3 premium user with active premium or gauth premium user has access to infrastructure
    premiumUntil,
    hasFreeToPremiumTransition,
    hasPremiumToFreeTransition,
    hasStatusTransition,
    hasConnectWalletMessage,
  };
};