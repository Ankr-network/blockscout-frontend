import { IJwtToken } from 'multirpc-sdk';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'store';

export interface IAuthSlice {
  credentials?: IJwtToken | false;
  address?: string;
  authorizationToken?: string;
  encryptionPublicKey?: string;
}

const initialState: IAuthSlice = {};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthData: (state, action: PayloadAction<IAuthSlice>) => {
      const { credentials, address, authorizationToken, encryptionPublicKey } =
        action.payload;

      if (credentials) {
        state.credentials = credentials;
      }

      if (address) {
        state.address = address;
      }

      if (authorizationToken) {
        state.authorizationToken = authorizationToken;
      }

      if (encryptionPublicKey) {
        state.encryptionPublicKey = encryptionPublicKey;
      }
    },

    resetAuthData: state => {
      state.credentials = undefined;
      state.address = undefined;
      state.authorizationToken = undefined;
      state.encryptionPublicKey = undefined;
    },
  },
});

export const selectAuthData = (state: RootState) => state.auth;

export const { setAuthData, resetAuthData } = authSlice.actions;
