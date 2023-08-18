import BigNumber from 'bignumber.js';
import { EthAddressType, Tier } from 'multirpc-sdk';
import { createSelector } from '@reduxjs/toolkit';

import {
  selectSelectedUserGroupRole,
  selectUserGroupConfigByAddress,
} from 'domains/userGroup/store';
import { selectTotalBalance } from 'domains/account/store/selectors';

import {
  defaultPremiumStatusData,
  fetchPremiumStatus,
} from '../actions/fetchPremiumStatus';
import { getPremiumActivationThreshold } from '../utils/getPremiumActivationThreshold';
import { getPremiumUntilDate } from '../utils/getPremiumUntilDate';
import { selectAuthData } from './authSlice';

export const selectAddress = createSelector(
  selectAuthData,
  ({ address = '' }) => address,
);

export const selectCredentials = createSelector(
  selectAuthData,
  ({ credentials }) => credentials,
);

export const selectIsLoggedIn = createSelector(
  selectAuthData,
  ({ hasOauthLogin, hasWeb3Connection }) =>
    Boolean(hasOauthLogin || hasWeb3Connection),
);

export const selectIsTokenExpired = createSelector(
  selectAuthData,
  ({ credentials, hasOauthLogin, workerTokenData }) =>
    Boolean(
      credentials && !workerTokenData?.userEndpointToken && !hasOauthLogin,
    ),
);

export const selectPremiumStatus = createSelector(
  fetchPremiumStatus.select(''),
  ({ data: { status } = defaultPremiumStatusData }) => status,
);

export const selectHasFreemium = createSelector(
  fetchPremiumStatus.select(''),
  selectIsLoggedIn,
  ({ data: { isFreemium } = defaultPremiumStatusData }, isLoggedIn) =>
    isLoggedIn && isFreemium,
);

export const selectHasPremium = createSelector(
  fetchPremiumStatus.select(''),
  ({ data: { isFreemium } = defaultPremiumStatusData }) => !isFreemium,
);

export const selectPremiumStatusLoading = createSelector(
  fetchPremiumStatus.select(''),
  ({ isLoading }) => isLoading,
);

export const selectIsOldPremium = createSelector(
  selectAuthData,
  selectIsTokenExpired,
  ({ workerTokenData }, isTokenExpired) =>
    workerTokenData?.tier === Tier.Premium || isTokenExpired,
);

export const selectPremiumUntilDate = createSelector(
  selectCredentials,
  selectIsOldPremium,
  (credentials, isOldPremium) =>
    getPremiumUntilDate({
      isOldPremium,
      expiresAt: credentials?.expires_at,
    }),
);

export const selectWorkerTokenData = createSelector(
  selectAuthData,
  ({ workerTokenData }) => workerTokenData,
);

export const selectUserEndpointToken = createSelector(
  selectWorkerTokenData,
  workerTokenData => workerTokenData?.userEndpointToken,
);

export const selectHasPrivateAccess = createSelector(
  selectCredentials,
  selectUserEndpointToken,
  (credentials, userEndpointToken) => Boolean(credentials || userEndpointToken),
);

export const selectHasInfrastructureAccess = createSelector(
  selectHasPremium,
  selectUserEndpointToken,
  (hasPremium, userEndpointToken) => Boolean(hasPremium && userEndpointToken),
);

export const selectIsUserEthAddressType = createSelector(
  selectAuthData,
  ({ ethAddressType }) => ethAddressType === EthAddressType.User,
);

export const selectHasUserEndpointToken = createSelector(
  selectUserEndpointToken,
  userEndpointToken => Boolean(userEndpointToken),
);

export const selectHasWeb3Connection = createSelector(
  selectAuthData,
  ({ hasWeb3Connection }) => Boolean(hasWeb3Connection),
);

export const selectHasOauthLogin = createSelector(
  selectAuthData,
  ({ hasOauthLogin }) => Boolean(hasOauthLogin),
);

export const selectIsWeb3UserWithEmailBound = createSelector(
  selectHasOauthLogin,
  selectHasWeb3Connection,
  selectIsUserEthAddressType,
  (
    hasOauthLogin,
    hasWeb3Connection,
    isUserEthAddressType,
    // eslint-disable-next-line max-params
  ) =>
    !hasWeb3Connection &&
    hasOauthLogin &&
    isUserEthAddressType,
);

const freeToPremiumThreshold = getPremiumActivationThreshold();

export const selectHasFreeToPremiumTransition = createSelector(
  selectTotalBalance,
  selectHasFreemium,
  selectIsWeb3UserWithEmailBound,
  (balance, hasFreemium, isWeb3UserWithEmailBound) =>
    Boolean(
      !isWeb3UserWithEmailBound &&
        hasFreemium &&
        new BigNumber(balance).isGreaterThanOrEqualTo(freeToPremiumThreshold),
    ),
);

export const selectHasStatusTransition = createSelector(
  selectHasFreeToPremiumTransition,
  selectSelectedUserGroupRole,
  (hasFreeToPremiumTransition, userRole) =>
    userRole !== 'GROUP_ROLE_DEV' && hasFreeToPremiumTransition,
);

export const selectHasConnectWalletMessage = createSelector(
  selectHasOauthLogin,
  selectHasWeb3Connection,
  selectHasUserEndpointToken,
  selectIsUserEthAddressType,
  (
    hasOauthLogin,
    hasWeb3Connection,
    hasUserEndpointToken,
    isUserEthAddressType,
    // eslint-disable-next-line max-params
  ) =>
    hasOauthLogin &&
    !hasWeb3Connection &&
    !hasUserEndpointToken &&
    isUserEthAddressType,
);

export const selectCurrentAddress = createSelector(
  selectAddress,
  selectUserGroupConfigByAddress,
  (address, { selectedGroupAddress }) => selectedGroupAddress || address,
);

