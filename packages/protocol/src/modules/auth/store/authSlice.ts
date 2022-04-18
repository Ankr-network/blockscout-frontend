import { IJwtToken } from 'multirpc-sdk';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'store';

export interface IAuthSlice {
  credentials?: IJwtToken;
  address?: string;
  authorizationToken?: string;
}

const initialState: IAuthSlice = {};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthData: (state, action: PayloadAction<IAuthSlice>) => {
      const { credentials, address, authorizationToken } = action.payload;

      if (credentials) {
        state.credentials = credentials;
      }

      if (address) {
        state.address = address;
      }

      if (authorizationToken) {
        state.authorizationToken = authorizationToken;
      }
    },

    resetAuthData: state => {
      state.credentials = undefined;
      state.address = undefined;
      state.authorizationToken = undefined;
    },
  },
});

export const selectAuthData = (state: RootState) => state.auth;

export const { setAuthData, resetAuthData } = authSlice.actions;
