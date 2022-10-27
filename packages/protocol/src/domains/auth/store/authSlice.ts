import { IJwtToken } from 'multirpc-sdk';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from 'store';
import { IWalletMeta } from '@ankr.com/provider-core';

export interface IAuthSlice {
  credentials?: IJwtToken | false;
  address?: string;
  authorizationToken?: string;
  encryptionPublicKey?: string;
  isManualConnected?: boolean;
  isManualDisconnected?: boolean;
  walletMeta?: IWalletMeta;
}

const initialState: IAuthSlice = {
  isManualConnected: false,
  isManualDisconnected: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthData: (state, action: PayloadAction<IAuthSlice>) => {
      const {
        credentials,
        address,
        authorizationToken,
        encryptionPublicKey,
        isManualDisconnected,
        isManualConnected,
        walletMeta,
      } = action.payload;

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

      if (walletMeta) {
        state.walletMeta = walletMeta;
      }

      state.isManualDisconnected = Boolean(isManualDisconnected);
      state.isManualConnected = Boolean(isManualConnected);
    },

    resetAuthData: state => {
      state.credentials = undefined;
      state.address = undefined;
      state.authorizationToken = undefined;
      state.encryptionPublicKey = undefined;
      state.isManualConnected = false;
      state.walletMeta = undefined;
    },
  },
});

export const selectAuthData = (state: RootState) => state.auth;

export const { setAuthData, resetAuthData } = authSlice.actions;
