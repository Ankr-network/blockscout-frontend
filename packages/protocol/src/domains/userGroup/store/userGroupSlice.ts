import { Address } from '@ankr.com/provider';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GroupUserRole } from 'multirpc-sdk';

import { GroupJwtData } from '../types';

interface UserGroupConfig {
  shouldRemind?: boolean;
  selectedGroupAddress?: Address;
  selectedGroupRole?: GroupUserRole;
}

export type UserGroupConfigWithAddress = UserGroupConfig & { address: Address };

export interface IUserGroupSlice {
  userGroupConfig: Record<Address, UserGroupConfig>;
  userGroupJwt: Record<Address, GroupJwtData>;
}

const initialState: IUserGroupSlice = {
  userGroupConfig: {},
  userGroupJwt: {},
};

export const USER_GROUP_ACTION_NAME = 'userGroup';

export const userGroupSlice = createSlice({
  name: USER_GROUP_ACTION_NAME,
  initialState,
  reducers: {
    setUserGroupConfig: (
      state,
      action: PayloadAction<UserGroupConfig & { address: Address }>,
    ) => {
      const { address, ...other } = action?.payload || {};

      state.userGroupConfig[address] = {
        ...(state.userGroupConfig[address] || {}),
        ...other,
      };
    },
    setUserGroupJwt: (
      state,
      action: PayloadAction<GroupJwtData & { groupAddress: Address }>,
    ) => {
      const { groupAddress, ...other } = action?.payload || {};

      state.userGroupJwt[groupAddress] = {
        ...(state.userGroupJwt[groupAddress] || {}),
        ...other,
      };
    },
    resetUserGroupConfig: (
      state,
      action: PayloadAction<Address | undefined>,
    ) => {
      const address = action.payload || '';
      const config = state.userGroupConfig[address];

      if (config) {
        const { selectedGroupAddress, selectedGroupRole, shouldRemind } =
          config;

        state.userGroupConfig[address] = {
          selectedGroupAddress: shouldRemind ? selectedGroupAddress : undefined,
          selectedGroupRole: shouldRemind ? selectedGroupRole : undefined,
          shouldRemind,
        };
      }
    },
    resetUserGroupJwt: (state, action: PayloadAction<Address | undefined>) => {
      const address = action.payload || '';
      const token = state.userGroupJwt[address];

      if (token) {
        state.userGroupJwt[address] = {
          jwtData: undefined,
          jwtToken: undefined,
        };
      }
    },
  },
});

export const {
  resetUserGroupConfig,
  resetUserGroupJwt,
  setUserGroupConfig,
  setUserGroupJwt,
} = userGroupSlice.actions;
