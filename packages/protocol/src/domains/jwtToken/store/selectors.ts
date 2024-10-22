import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'store';
import { selectCurrentAddress, selectIsLoggedIn } from 'domains/auth/store';
import { selectDraftTokenIndex } from 'domains/projects/store';

import { MINIMAL_TOKENS_LIMIT } from '../utils/utils';
import {
  selectAllowedJWTsCount,
  selectAllowedJWTsCountState,
} from '../action/fetchAllowedJWTsCount';
import { selectJWTs } from '../action/fetchJWTs';

export const selectJwtTokenManager = (state: RootState) =>
  state.jwtTokenManager;

export const selectConfiguredProjectJwtTokens = createSelector(
  selectJWTs,
  selectDraftTokenIndex,
  (jwts, draftTokenIndex) => jwts.filter(jwt => jwt.index !== draftTokenIndex),
);

export const selectSelectedProject = createSelector(
  selectJwtTokenManager,
  selectCurrentAddress,
  (jwtTokenManager, address) => jwtTokenManager[address]?.selectedProject,
);

export const selectHasJwtManagerAccess = createSelector(
  selectAllowedJWTsCountState,
  selectAllowedJWTsCount,
  selectIsLoggedIn,
  ({ isLoading, isSuccess, isUninitialized }, allowedJwtsCount, isLoggedIn) =>
    isLoggedIn &&
    !isUninitialized &&
    !isLoading &&
    isSuccess &&
    allowedJwtsCount >= MINIMAL_TOKENS_LIMIT,
);
