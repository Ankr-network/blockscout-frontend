import { createSelector } from '@reduxjs/toolkit';
import { IApiUserGroupParams } from 'multirpc-sdk';

import { RootState } from 'store';
import { hasGroupPermission } from 'modules/groups/utils/hasGroupPermission';
import { mapGroupDetails } from 'modules/groups/utils/mapGroupDetails';
import { selectAuthData } from 'domains/auth/store/authSlice';

import { BlockWithPermission, PERSONAL_GROUP_NAME } from '../constants/groups';
import { userGroupFetchCreationAllowance } from '../actions/fetchGroupCreationAllowance';
import { userGroupFetchGroupDetails } from '../actions/fetchGroupDetails';
import { userGroupFetchGroups } from '../actions/fetchGroups';

const requestParamsPlaceholder = undefined as unknown as IApiUserGroupParams;

export const selectUserGroupConfig = (state: RootState) =>
  state.userGroup.userGroupConfig;

export const selectUserGroupJwt = (state: RootState) =>
  state.userGroup.userGroupJwt;

export const selectUserGroupConfigByAddress = createSelector(
  selectAuthData,
  selectUserGroupConfig,
  ({ authAddress = '' }, userGroupConfig) => userGroupConfig[authAddress] || {},
);

export const selectUserGroupLoading = createSelector(
  userGroupFetchGroups.select(),
  ({ isLoading }) => isLoading,
);

export const selectUserGroups = createSelector(
  userGroupFetchGroups.select(),
  ({ data: userGroups = [] }) => userGroups,
);

export const selectUserGroupsWithoutPersonal = createSelector(
  selectUserGroups,
  userGroups => {
    return userGroups.filter(({ name }) => name !== PERSONAL_GROUP_NAME);
  },
);

export const selectIsGroupCreationAllowed = createSelector(
  userGroupFetchCreationAllowance.select(),
  ({ data }) => data?.result?.groupCreationAvailable,
);

export const selectIsGroupCreationAllowanceLoading = createSelector(
  userGroupFetchCreationAllowance.select(),
  ({ isLoading, isUninitialized }) => isLoading || isUninitialized,
);

export const selectGroupDetailsRequestData = createSelector(
  userGroupFetchGroupDetails.select(requestParamsPlaceholder),
  selectAuthData,
  ({ data }, { authAddress: currentUserAddress = '' }) =>
    mapGroupDetails(data, currentUserAddress),
);

export const selectGroupDetailsRequestState = createSelector(
  userGroupFetchGroupDetails.select(requestParamsPlaceholder),
  selectGroupDetailsRequestData,
  (requestState, data) => ({
    ...requestState,
    data,
  }),
);

export const selectGroupDetailsRequestArgs = createSelector(
  userGroupFetchGroupDetails.select(requestParamsPlaceholder),
  ({ originalArgs }) => originalArgs,
);

export const selectIsGroupDetailsLoading = createSelector(
  userGroupFetchGroupDetails.select(requestParamsPlaceholder),
  ({ isLoading }) => isLoading,
);

export const selectSortedUserGroupsWithoutPersonal = createSelector(
  selectUserGroupsWithoutPersonal,
  selectUserGroupConfigByAddress,
  (userGroups, { selectedGroupAddress }) => {
    return [...userGroups].sort((a, b) => {
      if (a.address === selectedGroupAddress) return -1;

      if (b.address === selectedGroupAddress) return 1;

      if (hasGroupPermission(a.role, BlockWithPermission.TeamManagement)) {
        return -1;
      }

      if (hasGroupPermission(b.role, BlockWithPermission.TeamManagement)) {
        return 1;
      }

      return 0;
    });
  },
);

export const selectHasUserGroups = createSelector(
  selectUserGroups,
  userGroups => userGroups.length > 1,
);

export const selectSelectedUserGroup = createSelector(
  selectUserGroupConfigByAddress,
  selectUserGroups,
  ({ selectedGroupAddress }, groups) =>
    groups.find(({ address }) => address === selectedGroupAddress),
);

export const selectSelectedUserGroupRole = createSelector(
  selectUserGroupConfigByAddress,
  selectUserGroups,
  ({ selectedGroupAddress }, groups) =>
    groups.find(({ address }) => address === selectedGroupAddress)?.role,
);

export const selectAllUserGroupsJwtTokens = createSelector(
  selectUserGroupJwt,
  userGroupJwt => userGroupJwt,
);

export const selectUserGroupJwtBySelectedGroupAddress = createSelector(
  selectSelectedUserGroup,
  selectUserGroupJwt,
  (selectedGroup, userGroupJwt) =>
    selectedGroup?.address ? userGroupJwt[selectedGroup?.address] : {},
);

export const selectIsSelectedUserGroupPersonal = createSelector(
  selectSelectedUserGroup,
  selectUserGroups,
  (selectedGroup, [firstGroup]) =>
    firstGroup?.address === selectedGroup?.address,
);

export const selectSelectedUserGroupIndex = createSelector(
  selectSelectedUserGroup,
  selectUserGroups,
  (selectedGroup, groups) =>
    groups.findIndex(group => group.address === selectedGroup?.address) || 0,
);
