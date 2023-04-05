import { Address } from '@ankr.com/provider';
import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { selectAuthData } from 'domains/auth/store/authSlice';

import { RootState } from 'store';
import { userGroupFetchGroups } from '../actions/fetchGroups';

interface UserGroupConfig {
  shouldRemind?: boolean;
  selectedGroupAddress?: Address;
}

export interface IUserGroupSlice {
  userGroupConfig: Record<Address, UserGroupConfig>;
}

const initialState: IUserGroupSlice = {
  userGroupConfig: {},
};

export const userGroupSlice = createSlice({
  name: 'userGroup',
  initialState,
  reducers: {
    setUserGroupConfig: (
      state,
      action: PayloadAction<UserGroupConfig & { address: Address }>,
    ) => {
      const { address, ...other } = action?.payload;

      state.userGroupConfig[address] = {
        ...(state.userGroupConfig[address] || {}),
        ...other,
      };
    },
    resetUserGroupConfig: (
      state,
      action: PayloadAction<Address | undefined>,
    ) => {
      const address = action.payload ?? '';
      const config = state.userGroupConfig[address];

      if (config) {
        const { shouldRemind, selectedGroupAddress } = config;

        state.userGroupConfig[address] = {
          selectedGroupAddress: shouldRemind ? selectedGroupAddress : undefined,
          shouldRemind,
        };
      }
    },
  },
});

export const selectUserGroupConfig = (state: RootState) =>
  state.userGroup.userGroupConfig;

export const selectUserGroupConfigByAddress = createSelector(
  selectAuthData,
  selectUserGroupConfig,
  ({ address = '' }, userGroupConfig) => userGroupConfig[address] ?? {},
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

export const { setUserGroupConfig, resetUserGroupConfig } =
  userGroupSlice.actions;
