import { EthAddressType, IJwtToken, WorkerTokenData } from 'multirpc-sdk';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from 'store';
import { IWalletMeta } from '@ankr.com/provider';
import { clearCookie, getCookieByName, setCookie } from './cookie';

const WORKER_TOKEN_DATA_KEY = 'WORKER_TOKEN_DATA_KEY';
let WORKER_TOKEN_DATA: IAuthSlice['workerTokenData'];

export interface IAuthSlice {
  credentials?: IJwtToken;
  workerTokenData?: WorkerTokenData;
  address?: string;
  authorizationToken?: string;
  encryptionPublicKey?: string;
  isManualConnected?: boolean;
  isManualDisconnected?: boolean;
  walletMeta?: IWalletMeta;
  hasWeb3Connection?: boolean;
  hasOauthLogin?: boolean;
  email?: string;
  ethAddressType?: EthAddressType;
  isCardPayment?: boolean;
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
        hasWeb3Connection,
        hasOauthLogin,
        workerTokenData,
        email,
        ethAddressType,
        isCardPayment,
      } = action.payload;

      if (credentials) {
        state.credentials = credentials || undefined;
      }

      if (workerTokenData) {
        setCookie(WORKER_TOKEN_DATA_KEY, workerTokenData);
        WORKER_TOKEN_DATA = workerTokenData;
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

      if (hasWeb3Connection) {
        state.hasWeb3Connection = hasWeb3Connection;
      }

      if (hasOauthLogin) {
        state.hasOauthLogin = hasOauthLogin;
      }

      if (email) {
        state.email = email;
      }

      if (ethAddressType) {
        state.ethAddressType = ethAddressType;
      }

      if (isCardPayment) {
        state.isCardPayment = isCardPayment;
      }

      state.isManualDisconnected = Boolean(isManualDisconnected);
      state.isManualConnected = Boolean(isManualConnected);
    },

    resetAuthData: state => {
      state.credentials = undefined;
      state.workerTokenData = undefined;

      state.address = undefined;
      state.authorizationToken = undefined;
      state.encryptionPublicKey = undefined;
      state.isManualConnected = false;
      state.walletMeta = undefined;
      state.hasWeb3Connection = undefined;
      state.hasOauthLogin = undefined;
      state.email = undefined;
      state.ethAddressType = undefined;
      state.isCardPayment = undefined;

      clearCookie(WORKER_TOKEN_DATA_KEY);
      WORKER_TOKEN_DATA = undefined;
    },
  },
});

export const selectAuthData: (state: RootState) => IAuthSlice = (
  state: RootState,
): IAuthSlice => {
  if (state.auth) {
    if (WORKER_TOKEN_DATA === undefined) {
      WORKER_TOKEN_DATA = getCookieByName(WORKER_TOKEN_DATA_KEY);
    }

    return {
      ...state.auth,
      workerTokenData: WORKER_TOKEN_DATA,
    };
  }

  return {};
};

export const { setAuthData, resetAuthData } = authSlice.actions;
