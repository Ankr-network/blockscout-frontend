import { createSelector } from '@reduxjs/toolkit';

import {
  IRequestParams,
  fetchAllJwtTokenRequests,
} from '../action/getAllJwtToken';
import { RootState } from 'store';
import { selectAddress } from 'domains/auth/store/selectors';
import { selectUserGroupConfigByAddress } from 'domains/userGroup/store';

const selectJwtTokenManager = (state: RootState) => state.jwtTokenManager;

export const selectJwtTokens = createSelector(
  fetchAllJwtTokenRequests.select(undefined as unknown as IRequestParams),
  ({ data: { jwtTokens = [] } = {} }) => jwtTokens,
);

export const selectProjectAddress = createSelector(
  selectAddress,
  selectUserGroupConfigByAddress,
  (address, { selectedGroupAddress }) => selectedGroupAddress || address,
);

export const selectSelectedProject = createSelector(
  selectJwtTokenManager,
  selectProjectAddress,
  (jwtTokenManager, address) => jwtTokenManager[address]?.selectedProject,
);
