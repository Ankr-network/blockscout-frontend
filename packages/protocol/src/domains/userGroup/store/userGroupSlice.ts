import { Address } from '@ankr.com/provider';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { GroupUserRole } from 'multirpc-sdk';

interface UserGroupConfig {
  shouldRemind?: boolean;
  selectedGroupAddress?: Address;
  selectedGroupRole?: GroupUserRole;
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
        const { shouldRemind, selectedGroupAddress, selectedGroupRole } =
          config;

        state.userGroupConfig[address] = {
          selectedGroupAddress: shouldRemind ? selectedGroupAddress : undefined,
          selectedGroupRole: shouldRemind ? selectedGroupRole : undefined,
          shouldRemind,
        };
      }
    },
  },
});

export const { setUserGroupConfig, resetUserGroupConfig } =
  userGroupSlice.actions;
