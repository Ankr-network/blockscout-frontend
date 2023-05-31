import { selectAuthData } from '../store/authSlice';
import {
  selectAddress,
  selectHasConnectWalletMessage,
  selectHasFreemium,
  selectHasFreeToPremiumTransition,
  selectHasInfrastructureAccess,
  selectHasPremium,
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
  const address = useAppSelector(selectAddress);

  const { loading: web3ConnectionLoading, ...rest } = useWeb3Connection();

  const { loading: autologinLoading, ...oauthRest } = useOauth();

  const { isLoading: premiumStatusLoading } = usePremiumStatus();

  return {
    loading: hasWeb3Connection
      ? web3ConnectionLoading || premiumStatusLoading
      : autologinLoading || premiumStatusLoading,
    ...rest,
    ...authData,
    ...oauthRest,
    address,
    hasWeb3Connection: Boolean(hasWeb3Connection),
    isWalletConnected: Boolean(address),
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
    hasStatusTransition,
    hasConnectWalletMessage,
  };
};
