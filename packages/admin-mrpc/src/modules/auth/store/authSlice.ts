import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthProviderEnum } from 'multirpc-sdk';

import { RootState } from 'store';

export interface IAuthSlice {
  email?: string;
  backofficeAuthorizationToken?: string;
  expiresAt?: string;
  provider?: AuthProviderEnum;
}

const initialState: IAuthSlice = {};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthData: (state, action: PayloadAction<IAuthSlice>) => {
      const { email, backofficeAuthorizationToken, expiresAt, provider } =
        action.payload;

      if (backofficeAuthorizationToken) {
        state.backofficeAuthorizationToken = backofficeAuthorizationToken;
      }

      if (provider) {
        state.provider = provider;
      }

      if (expiresAt) {
        state.expiresAt = expiresAt;
      }

      if (email) {
        state.email = email;
      }
    },

    resetAuthData: state => {
      state.email = undefined;
      state.backofficeAuthorizationToken = undefined;
      state.expiresAt = undefined;
      state.provider = undefined;
    },
  },
});

export const selectAuthData = (state: RootState) => state.auth;

export const {
  reducer: authReducer,
  actions: { setAuthData, resetAuthData },
} = authSlice;
