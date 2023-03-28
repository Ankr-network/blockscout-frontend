import { EthAddressType, PremiumStatus, Tier } from 'multirpc-sdk';
import { createSelector } from '@reduxjs/toolkit';

import { TIME_TO_WAIT_FOR_STATUS_TRANSITION } from './const';
import { accountFetchBalance } from 'domains/account/actions/balance/fetchBalance';
import { fetchPremiumStatus } from '../actions/fetchPremiumStatus';
import { getPremiumBalanceThresholds } from '../utils/getPremiumBalanceThresholds';
import { getPremiumUntilDate } from '../utils/getPremiumUntilDate';
import { oauthHasDepositTransaction } from 'domains/oauth/actions/hasDepositTransaction';
import { selectAuthData } from './authSlice';

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

export const selectHasFreemium = createSelector(
  fetchPremiumStatus.select(''),
  selectIsLoggedIn,
  ({ data: status = PremiumStatus.INACTIVE }, isLoggedIn) =>
    isLoggedIn && status === PremiumStatus.INACTIVE,
);

export const selectHasPremium = createSelector(
  fetchPremiumStatus.select(''),
  ({ data: status }) => status === PremiumStatus.ACTIVE,
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
  selectHasUserEndpointToken,
  selectIsUserEthAddressType,
  (
    hasOauthLogin,
    hasWeb3Connection,
    hasUserEndpointToken,
    isUserEthAddressType,
  ) =>
    !hasWeb3Connection &&
    hasOauthLogin &&
    !hasUserEndpointToken &&
    isUserEthAddressType,
);

export const selectHasZeroBalance = createSelector(
  accountFetchBalance.select(),
  ({ data: { creditBalance } = {} }) => creditBalance?.isZero() ?? true,
);

export const selectOauthLoginTimestamp = createSelector(
  selectAuthData,
  ({ email = '', oauthLoginTimestamps = {} }) => oauthLoginTimestamps[email],
);

// in ms
export const selectTimeToResetTransitionToFree = createSelector(
  selectOauthLoginTimestamp,
  timestamp =>
    timestamp
      ? TIME_TO_WAIT_FOR_STATUS_TRANSITION -
        (Date.now() - new Date(timestamp).getTime())
      : 0,
);

export const selectHasDepositTransaction = createSelector(
  oauthHasDepositTransaction.select(),
  ({ data: hasDepositTransaction = false }) => hasDepositTransaction,
);

export const selectIsNewUser = createSelector(
  selectHasZeroBalance,
  selectHasDepositTransaction,
  (hasZeroBalance, hasDepositTransaction) =>
    hasZeroBalance && !hasDepositTransaction,
);

export const selectHasTransitionToFreeWatcher = createSelector(
  selectIsNewUser,
  selectTimeToResetTransitionToFree,
  (isNewUser, timeToReset) => isNewUser && timeToReset > 0,
);

export const selectIsTransitionToFreeWatcherEnded = createSelector(
  selectIsNewUser,
  selectTimeToResetTransitionToFree,
  (isNewUser, timeToReset) => isNewUser && timeToReset <= 0,
);

const { freemiumToPremium, premiumToFreemium } = getPremiumBalanceThresholds();

export const selectHasFreeToPremiumTransition = createSelector(
  accountFetchBalance.select(),
  selectHasFreemium,
  selectIsWeb3UserWithEmailBound,
  ({ data: { creditBalance } = {} }, hasFreemium, isWeb3UserWithEmailBound) =>
    Boolean(
      !isWeb3UserWithEmailBound &&
        hasFreemium &&
        creditBalance?.gte(freemiumToPremium),
    ),
);

export const selectHasPremiumToFreeTransition = createSelector(
  accountFetchBalance.select(),
  selectHasPremium,
  selectIsTransitionToFreeWatcherEnded,
  ({ data: { creditBalance } = {} }, hasPremium, isWatcherEnded) =>
    hasPremium &&
    Boolean(creditBalance?.lt(premiumToFreemium)) &&
    !isWatcherEnded,
);

export const selectHasStatusTransition = createSelector(
  selectHasFreeToPremiumTransition,
  selectHasPremiumToFreeTransition,
  (hasFreeToPremiumTransition, hasPremiumToFreeTransition) =>
    hasFreeToPremiumTransition || hasPremiumToFreeTransition,
);

export const selectHasConnectWalletMessage = createSelector(
  selectHasOauthLogin,
  selectHasWeb3Connection,
  selectHasPrivateAccess,
  selectIsUserEthAddressType,
  (hasOauthLogin, hasWeb3Connection, hasPrivateAccess, isUserEthAddressType) =>
    hasOauthLogin &&
    !hasWeb3Connection &&
    hasPrivateAccess &&
    isUserEthAddressType,
);
