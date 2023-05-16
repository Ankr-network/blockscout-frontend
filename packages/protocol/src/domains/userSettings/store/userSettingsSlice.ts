import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'store';

interface TwoFAEndpoint {
  endpointName: string;
  params: any;
}

interface UserSettingsSlice {
  isOpened?: boolean;
  twoFACode?: string;
  errorMessage?: string;
  endpoint?: TwoFAEndpoint;
}

const initialState: UserSettingsSlice = {};

export const userSettingsSlice = createSlice({
  name: 'userSettings',
  initialState,
  reducers: {
    setIsTwoFADialogOpened: (state, action: PayloadAction<boolean>) => {
      state.isOpened = action.payload;
    },
    setTwoFACode: (state, action: PayloadAction<string>) => {
      state.twoFACode = action.payload;
    },
    setTwoFAErrorMessage: (state, action: PayloadAction<string>) => {
      state.errorMessage = action.payload;
    },
    setTwoFAEndpoint: (
      state,
      action: PayloadAction<TwoFAEndpoint | undefined>,
    ) => {
      state.endpoint = action.payload;
    },
  },
});

export const selectIsTwoFADialogOpened = (state: RootState) =>
  state.userSettings.isOpened;

export const selectTwoFAErrorMessage = (state: RootState) =>
  state.userSettings.errorMessage;

export const selectTwoFACode = (state: RootState) =>
  state.userSettings.twoFACode ?? '';

export const selectTwoFAEndpoint = (state: RootState) =>
  state.userSettings.endpoint;

export const {
  setIsTwoFADialogOpened,
  setTwoFACode,
  setTwoFAErrorMessage,
  setTwoFAEndpoint,
} = userSettingsSlice.actions;
