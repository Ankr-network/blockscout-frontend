import { OauthLoginProvider } from 'multirpc-sdk';

import { useAppSelector } from 'store/useAppSelector';
import { useOauth } from 'domains/oauth/hooks/useOauth';

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
  selectPremiumStatusValue,
  selectIsTokenExpired,
  selectIsUserEthAddressType,
  selectPremiumStatus,
  selectPremiumStatusLoading,
  selectPremiumUntilDate,
  selectIsPremiumStatusUninitialized,
} from '../store';
import { useWeb3Connection } from './useWeb3Connection';

export const useAuth = () => {
  const { oauthProviders, ...authData } = useAppSelector(selectAuthData);

  const hasConnectWalletMessage = useAppSelector(selectHasConnectWalletMessage);
  const hasFreeToPremiumTransition = useAppSelector(
    selectHasFreeToPremiumTransition,
  );
  const hasInfrastructureAccess = useAppSelector(selectHasInfrastructureAccess);
  const hasPremium = useAppSelector(selectHasPremium);
  const isPremiumStatusLoading = useAppSelector(selectPremiumStatusLoading);
  const premiumStatusValue = useAppSelector(selectPremiumStatusValue);
  const isPremiumStatusUninitialized = useAppSelector(
    selectIsPremiumStatusUninitialized,
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
  const address = useAppSelector(selectAddress);
  const premiumStatus = useAppSelector(selectPremiumStatus);

  const { loading: web3ConnectionLoading, ...rest } = useWeb3Connection();

  const { loading: autologinLoading, ...oauthRest } = useOauth();

  const isPremiumStatusValueExists = premiumStatusValue !== undefined;

  const isPremiumStatusInitLoading =
    isPremiumStatusLoading && !isPremiumStatusValueExists;

  return {
    loading:
      web3ConnectionLoading || autologinLoading || isPremiumStatusInitLoading,
    isPremiumStatusInitLoading,
    isPremiumStatusValueExists,
    isPremiumStatusUninitialized,
    ...rest,
    ...authData,
    ...oauthRest,
    oauthProviders,
    hasGithubLogin: oauthProviders?.includes(OauthLoginProvider.Github),
    hasGoogleLogin: oauthProviders?.includes(OauthLoginProvider.Google),
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
  };
};
