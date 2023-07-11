import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'store';
import { fetchAllJwtTokenRequests } from '../action/getAllJwtToken';
import { fetchAllowedJwtTokensCount } from '../action/getAllowedJwtTokensCount';
import { selectCurrentAddress, selectIsLoggedIn } from 'domains/auth/store';
import { MINIMAL_TOKENS_LIMIT } from '../utils/utils';

const selectJwtTokenManager = (state: RootState) => state.jwtTokenManager;

export const selectJwtTokens = createSelector(
  fetchAllJwtTokenRequests.select({}),
  ({ data: { jwtTokens = [] } = {} }) => jwtTokens,
);

export const selectSelectedProject = createSelector(
  selectJwtTokenManager,
  selectCurrentAddress,
  (jwtTokenManager, address) => jwtTokenManager[address]?.selectedProject,
);

export const selectAllowedJwtsCountState = createSelector(
  fetchAllowedJwtTokensCount.select({}),
  state => state,
);

export const selectAllowedJwtsCount = createSelector(
  selectAllowedJwtsCountState,
  ({ data = 0 }) => data,
);

export const selectHasJwtManagerAccess = createSelector(
  selectAllowedJwtsCountState,
  selectAllowedJwtsCount,
  selectIsLoggedIn,
  ({ isLoading, isSuccess, isUninitialized }, allowedJwtsCount, isLoggedIn) =>
    isLoggedIn &&
    !isUninitialized &&
    !isLoading &&
    isSuccess &&
    allowedJwtsCount >= MINIMAL_TOKENS_LIMIT,
);
