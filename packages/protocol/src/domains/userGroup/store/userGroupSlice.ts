import { Address } from '@ankr.com/provider';
import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { selectAuthData } from 'domains/auth/store/authSlice';

import { RootState } from 'store';

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

export const { setUserGroupConfig, resetUserGroupConfig } =
  userGroupSlice.actions;
