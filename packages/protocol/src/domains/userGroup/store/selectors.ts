import { createSelector } from '@reduxjs/toolkit';

import { selectAuthData } from 'domains/auth/store/authSlice';
import { RootState } from 'store';

import { userGroupFetchGroups } from '../actions/fetchGroups';

export const selectUserGroupConfig = (state: RootState) =>
  state.userGroup.userGroupConfig;

export const selectUserGroupJwt = (state: RootState) =>
  state.userGroup.userGroupJwt;

export const selectUserGroupConfigByAddress = createSelector(
  selectAuthData,
  selectUserGroupConfig,
  ({ address = '' }, userGroupConfig) => userGroupConfig[address] ?? {},
);

export const selectUserGroupLoading = createSelector(
  userGroupFetchGroups.select(),
  ({ isLoading }) => isLoading,
);

export const selectUserGroups = createSelector(
  userGroupFetchGroups.select(),
  ({ data: userGroups = [] }) => userGroups,
);

export const selectHasUserGroups = createSelector(
  selectUserGroups,
  userGroups => userGroups.length > 1,
);

export const selectSelectedUserGroup = createSelector(
  selectUserGroupConfigByAddress,
  selectUserGroups,
  ({ selectedGroupAddress }, groups) =>
    groups.find(({ groupAddress }) => groupAddress === selectedGroupAddress),
);

export const selectSelectedUserGroupRole = createSelector(
  selectUserGroupConfigByAddress,
  selectUserGroups,
  ({ selectedGroupAddress }, groups) =>
    groups.find(({ groupAddress }) => groupAddress === selectedGroupAddress)
      ?.userRole,
);

export const selectAllUserGroupsJwtTokens = createSelector(
  selectUserGroupJwt,
  userGroupJwt => userGroupJwt,
);

export const selectUserGroupJwtBySelectedGroupAddress = createSelector(
  selectSelectedUserGroup,
  selectUserGroupJwt,
  (selectedGroup, userGroupJwt) =>
    selectedGroup?.groupAddress
      ? userGroupJwt[selectedGroup?.groupAddress]
      : {},
);

export const selectIsSelectedUserGroupPersonal = createSelector(
  selectSelectedUserGroup,
  selectUserGroups,
  (selectedGroup, [firstGroup]) =>
    firstGroup?.groupAddress === selectedGroup?.groupAddress,
);

export const selectSelectedUserGroupIndex = createSelector(
  selectSelectedUserGroup,
  selectUserGroups,
  (selectedGroup, groups) =>
    groups.findIndex(
      group => group.groupAddress === selectedGroup?.groupAddress,
    ) ?? 0,
);
