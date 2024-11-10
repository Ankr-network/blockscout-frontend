import BigNumber from 'bignumber.js';
import { EthAddressType, Tier, PremiumStatus } from 'multirpc-sdk';
import { createSelector, weakMapMemoize } from 'reselect';

import { BlockWithPermission } from 'domains/userGroup/constants/groups';
import { RootState } from 'store';
import {
  defaultPremiumStatusData,
  fetchPremiumStatus,
} from 'domains/auth/actions/fetchPremiumStatus';
import { deepEqulityCheck } from 'modules/common/utils/deepEqualityCheck';
import { getPermissions } from 'modules/groups/utils/getPermissions';
import { getPremiumActivationThreshold } from 'domains/auth/utils/getPremiumActivationThreshold';
import {
  selectUserGroupConfigByAddress,
  selectUserGroupJwtBySelectedGroupAddress,
} from 'domains/userGroup/store';
import {
  selectMyCurrentBundle,
  selectTotalBalance,
} from 'domains/account/store/selectors';

import { getPremiumUntilDate } from '../utils/getPremiumUntilDate';
import { selectAuthData } from './authSlice';

export const selectAddress = createSelector(
  selectAuthData,
  ({ authAddress = '' }) => authAddress,
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

export const selectWorkerTokenData = createSelector(
  selectAuthData,
  ({ workerTokenData }) => workerTokenData,
);

export const selectUserEndpointToken = createSelector(
  selectWorkerTokenData,
  workerTokenData => workerTokenData?.userEndpointToken,
);

export const selectPremiumStatusState = createSelector(
  selectUserGroupJwtBySelectedGroupAddress,
  selectUserEndpointToken,
  (state: RootState) => state,
  (selectedGroupJwt, userEndpointToken, state) => {
    const token = selectedGroupJwt?.jwtToken ?? userEndpointToken ?? '';

    return fetchPremiumStatus.select(token)(state);
  },
);

export const selectPremiumStatus = createSelector(
  selectPremiumStatusState,
  ({ data: { status } = defaultPremiumStatusData }) => status,
);

export const selectHasFreemium = createSelector(
  selectPremiumStatusState,
  selectIsLoggedIn,
  ({ data: { isFreemium } = defaultPremiumStatusData }, isLoggedIn) =>
    isLoggedIn && isFreemium,
);

export const selectHasPremium = createSelector(
  selectPremiumStatusState,
  ({ data: { isFreemium } = defaultPremiumStatusData }) => !isFreemium,
);

export const selectIsInactiveStatus = createSelector(
  selectPremiumStatusState,
  selectHasFreemium,
  ({ data: { status } = defaultPremiumStatusData }, isFreePremium) =>
    isFreePremium ? false : status === PremiumStatus.INACTIVE,
);

export const selectPremiumStatusLoading = createSelector(
  selectPremiumStatusState,
  ({ isLoading }) => isLoading,
);

export const selectIsPremiumStatusUninitialized = createSelector(
  selectPremiumStatusState,
  ({ isUninitialized }) => isUninitialized,
);

export const selectIsPremiumStatusLoaded = createSelector(
  selectPremiumStatusState,
  ({ data }) => Boolean(data),
);

export const selectPremiumStatusLoadingInitially = createSelector(
  selectPremiumStatusLoading,
  selectIsPremiumStatusUninitialized,
  (isLoading, isUninitialized) => isLoading && isUninitialized,
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

export const selectHasPrivateAccess = createSelector(
  selectCredentials,
  selectUserEndpointToken,
  selectIsLoggedIn,
  (credentials, userEndpointToken, isLoggedIn) =>
    isLoggedIn && Boolean(credentials || userEndpointToken),
);

export const selectHasInfrastructureAccess = createSelector(
  selectHasPremium,
  selectUserEndpointToken,
  (hasPremium, userEndpointToken) => Boolean(hasPremium && userEndpointToken),
);

export const selectIsUserEthAddressType = createSelector(
  selectAuthData,
  ({ authAddressType }) => authAddressType === EthAddressType.User,
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
  ) => !hasWeb3Connection && hasOauthLogin && isUserEthAddressType,
);

const freeToPremiumThreshold = getPremiumActivationThreshold();

export const selectHasFreeToPremiumTransition = createSelector(
  selectTotalBalance,
  selectMyCurrentBundle,
  selectHasFreemium,
  selectIsWeb3UserWithEmailBound,
  // eslint-disable-next-line max-params
  (balance, myBundle, hasFreemium, isWeb3UserWithEmailBound) => {
    const hasEnoughBalance = new BigNumber(balance).isGreaterThanOrEqualTo(
      freeToPremiumThreshold,
    );

    const hasBundle = Boolean(myBundle);
    const shouldBePremium = hasEnoughBalance || hasBundle;
    const hasNoEmailBound = !isWeb3UserWithEmailBound;

    return hasNoEmailBound && hasFreemium && shouldBePremium;
  },
);

export const selectHasStatusTransition = createSelector(
  selectHasFreeToPremiumTransition,
  selectUserGroupConfigByAddress,
  (hasFreeToPremiumTransition, { selectedGroupRole }) => {
    const permissions = getPermissions(selectedGroupRole);

    const hasAccess = permissions.includes(
      BlockWithPermission.StatusTransition,
    );

    return hasAccess && hasFreeToPremiumTransition;
  },
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
  {
    memoize: weakMapMemoize,
    argsMemoize: weakMapMemoize,
    argsMemoizeOptions: { resultEqualityCheck: deepEqulityCheck },
    memoizeOptions: { resultEqualityCheck: deepEqulityCheck },
  },
);

export const selectCurrentAddress = createSelector(
  selectAddress,
  selectUserGroupConfigByAddress,
  (address, { selectedGroupAddress }) => selectedGroupAddress || address,
);
