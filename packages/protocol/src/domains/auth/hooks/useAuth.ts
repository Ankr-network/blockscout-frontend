import { OauthLoginProvider } from 'multirpc-sdk';
import { useCallback } from 'react';

import { useAppSelector } from 'store/useAppSelector';
import { useOauth } from 'domains/oauth/hooks/useOauth';
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
  selectPremiumStatus,
  selectPremiumUntilDate,
  selectIsPremiumStatusUninitialized,
  selectIsPremiumStatusLoaded,
  selectPremiumStatusLoadingInitially,
  selectUserEndpointToken,
} from 'domains/auth/store';
import { selectAuthData } from 'domains/auth/store/authSlice';

import { useWeb3Connection } from './useWeb3Connection';

export const useAuth = () => {
  const { oauthProviders, ...authData } = useAppSelector(selectAuthData);
  const hasConnectWalletMessage = useAppSelector(selectHasConnectWalletMessage);
  const hasFreeToPremiumTransition = useAppSelector(
    selectHasFreeToPremiumTransition,
  );
  const hasInfrastructureAccess = useAppSelector(selectHasInfrastructureAccess);
  const hasPremium = useAppSelector(selectHasPremium);
  const isPremiumStatusLoading = useAppSelector(
    selectPremiumStatusLoadingInitially,
  );
  const isPremiumStatusUninitialized = useAppSelector(
    selectIsPremiumStatusUninitialized,
  );
  const isPremiumStatusLoaded = useAppSelector(selectIsPremiumStatusLoaded);
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
  const premiumStatus = useAppSelector(selectPremiumStatus);
  const userEndpointToken = useAppSelector(selectUserEndpointToken);

  const {
    handleDisconnect,
    loading: web3ConnectionLoading,
    ...web3Rest
  } = useWeb3Connection();

  const {
    handleSignOut: handleOauthSignOut,
    loading: autologinLoading,
    ...oauthRest
  } = useOauth();

  const handleSignOut = useCallback(() => {
    if (hasWeb3Connection) {
      handleDisconnect();
    } else {
      handleOauthSignOut();
    }
  }, [handleDisconnect, handleOauthSignOut, hasWeb3Connection]);

  const isLoggingIn = web3ConnectionLoading || autologinLoading;

  return {
    loading:
      web3ConnectionLoading || autologinLoading || isPremiumStatusLoading,
    isLoggingIn,
    isPremiumStatusLoaded,
    isPremiumStatusUninitialized,
    ...web3Rest,
    ...authData,
    ...oauthRest,
    handleDisconnect,
    handleSignOut,
    oauthProviders,
    hasGithubLogin: oauthProviders?.includes(OauthLoginProvider.Github),
    hasGoogleLogin: oauthProviders?.includes(OauthLoginProvider.Google),
    hasOauthWithoutWeb3: Boolean(authData.hasOauthLogin && !hasWeb3Connection),
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
    premiumStatus,
    userEndpointToken,
  };
};
