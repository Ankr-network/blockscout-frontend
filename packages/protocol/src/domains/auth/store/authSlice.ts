import { EthAddressType, IJwtToken, WorkerTokenData } from 'multirpc-sdk';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from 'store';
import { IWalletMeta } from '@ankr.com/provider';
import { clearCookie, getCookieByName, setCookie } from './cookie';

const WORKER_TOKEN_DATA_KEY = 'WORKER_TOKEN_DATA_KEY';
let WORKER_TOKEN_DATA: IAuthSlice['workerTokenData'];

export interface IAuthSlice {
  address?: string;
  authorizationToken?: string;
  credentials?: IJwtToken;
  email?: string;
  encryptionPublicKey?: string;
  ethAddressType?: EthAddressType;
  hasOauthLogin?: boolean;
  hasOauthUserDepositTransaction?: boolean;
  hasVoucherTransaction?: boolean;
  hasWeb3Connection?: boolean;
  isCardPayment?: boolean;
  trackingWalletName?: string;
  walletMeta?: IWalletMeta;
  workerTokenData?: WorkerTokenData;
  hasReminderConfigEmail?: boolean;
}

const initialState: IAuthSlice = {};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthData: (state, action: PayloadAction<IAuthSlice>) => {
      const { workerTokenData } = action.payload;

      if (workerTokenData) {
        setCookie(WORKER_TOKEN_DATA_KEY, workerTokenData);
        WORKER_TOKEN_DATA = workerTokenData;
      }

      Object.keys(action.payload).forEach(key => {
        const objKey = key as keyof IAuthSlice;

        if (key === 'workerTokenData') return;

        // @ts-ignore
        state[objKey] = action.payload[objKey];
      });
    },

    resetAuthData: state => {
      clearCookie(WORKER_TOKEN_DATA_KEY);
      WORKER_TOKEN_DATA = undefined;

      Object.keys(state).forEach(key => {
        const objKey = key as keyof IAuthSlice;

        if (key !== 'hasReminderConfigEmail') {
          // @ts-ignore
          state[objKey] = undefined;
        }
      });
    },

    setReminderConfigEmail: state => {
      state.hasReminderConfigEmail = true;
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

export const selectHasReminderConfigEmail = (state: RootState) =>
  state.auth.hasReminderConfigEmail;

export const { setAuthData, resetAuthData, setReminderConfigEmail } =
  authSlice.actions;
