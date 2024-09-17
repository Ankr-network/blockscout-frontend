import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from 'store';

interface TwoFAEndpoint {
  endpointName: string;
  params: any;
}

interface SignupSettings {
  hasTerms?: boolean;
  hasMarketing?: boolean;
}

interface UserSettingsSlice {
  isOpened?: boolean;
  twoFACode?: string;
  errorMessage?: string;
  endpoint?: TwoFAEndpoint;
  signupSettings: SignupSettings;
}

const initialState: UserSettingsSlice = { signupSettings: {} };

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
    setSignupSettings: (state, action: PayloadAction<SignupSettings>) => {
      const { hasMarketing, hasTerms } = action.payload;

      state.signupSettings = {
        ...state.signupSettings,
        hasMarketing,
        hasTerms,
      };
    },
  },
});
export const selectIsTwoFADialogOpened = (state: RootState) =>
  state.userSettings.isOpened;

export const selectTwoFAErrorMessage = (state: RootState) =>
  state.userSettings.errorMessage;

export const selectTwoFACode = (state: RootState) =>
  state.userSettings.twoFACode || '';

export const selectTwoFAEndpoint = (state: RootState) =>
  state.userSettings.endpoint;

export const selectSignupSettings = (state: RootState) =>
  state.userSettings.signupSettings || {};

export const {
  setIsTwoFADialogOpened,
  setSignupSettings,
  setTwoFACode,
  setTwoFAEndpoint,
  setTwoFAErrorMessage,
} = userSettingsSlice.actions;
