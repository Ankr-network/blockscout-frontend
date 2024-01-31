import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICreateUserGroupResponse } from 'multirpc-sdk';

import { NEW_USER_GROUP_KEY } from '../storage/newUserGroupPersistConfig';

interface NewUserGroupSlice {
  createUserGroupResponse?: ICreateUserGroupResponse;
  shouldContinueTeamCreationFlow?: boolean;
}

const initialState: NewUserGroupSlice = {};

export const newUserGroupSlice = createSlice({
  name: NEW_USER_GROUP_KEY,
  initialState,
  reducers: {
    setNewUserGroupData: (
      state,
      action: PayloadAction<ICreateUserGroupResponse>,
    ) => {
      state.createUserGroupResponse = action.payload;
    },
    resetNewUserGroupData: state => {
      state.createUserGroupResponse = undefined;
    },
    setShouldContinueTeamCreationFlow: (
      state,
      action: PayloadAction<boolean>,
    ) => {
      state.shouldContinueTeamCreationFlow = action.payload;
    },
    resetShouldContinueTeamCreationFlow: state => {
      state.shouldContinueTeamCreationFlow = false;
    },
  },
});

export const {
  setNewUserGroupData,
  resetNewUserGroupData,
  setShouldContinueTeamCreationFlow,
  resetShouldContinueTeamCreationFlow,
} = newUserGroupSlice.actions;
