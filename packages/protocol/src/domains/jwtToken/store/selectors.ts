import { createSelector } from '@reduxjs/toolkit';

import {
  IRequestParams,
  fetchAllJwtTokenRequests,
} from '../action/getAllJwtToken';
import { RootState } from 'store';
import { selectAddress } from 'domains/auth/store/selectors';
import { selectUserGroupConfigByAddress } from 'domains/userGroup/store';

export const selectTokenManager = (state: RootState) => state.jwtTokenManager;

export const selectProjects = createSelector(
  fetchAllJwtTokenRequests.select(undefined as unknown as IRequestParams),
  ({ data: { jwtTokens = [] } = {} }) => jwtTokens,
);

export const selectProjectAddress = createSelector(
  selectAddress,
  selectUserGroupConfigByAddress,
  (address, { selectedGroupAddress }) => selectedGroupAddress || address,
);

export const selectSelectedConfig = createSelector(
  selectTokenManager,
  selectProjectAddress,
  (manager, address) => manager[address],
);

export const selectSelectedProject = createSelector(
  selectSelectedConfig,
  config => config?.selectedProject,
);
