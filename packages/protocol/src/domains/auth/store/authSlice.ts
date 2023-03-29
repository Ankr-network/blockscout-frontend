import { EthAddressType, IJwtToken, WorkerTokenData } from 'multirpc-sdk';
import { IWalletMeta } from '@ankr.com/provider';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from 'store';
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
  hasDepositTransaction?: boolean;
  hasVoucherTransactionAndBalanceIsGreaterThanZero?: boolean;
  hasWeb3Connection?: boolean;
  isCardPayment?: boolean;
  trackingWalletName?: string;
  walletMeta?: IWalletMeta;
  workerTokenData?: WorkerTokenData;
  isInstantJwtParticipant?: boolean;
  hasWeb3Autoconnect?: boolean;
  oauthLoginTimestamps?: Record<string, string>;
}

const initialState: IAuthSlice = {
  address: '',
  oauthLoginTimestamps: {},
};

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

    setOauthLoginTimestamp: (state, { payload }: PayloadAction<string>) => {
      const { email } = state;

      if (email) {
        state.oauthLoginTimestamps = {
          ...(state.oauthLoginTimestamps ?? {}),
          [email]: state.oauthLoginTimestamps?.[email] ?? payload,
        };
      }
    },
    resetAuthData: state => {
      clearCookie(WORKER_TOKEN_DATA_KEY);
      WORKER_TOKEN_DATA = undefined;

      Object.keys(state).forEach(key => {
        const objKey = key as keyof IAuthSlice;

        if (key === 'oauthLoginTimestamps') return;

        // @ts-ignore
        state[objKey] = undefined;
      });
    },
    resetOauthLoginTimestamp: state => {
      // updates selectors cache

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      state = { ...state };
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

  return { address: '' };
};

export const {
  setAuthData,
  setOauthLoginTimestamp,
  resetAuthData,
  resetOauthLoginTimestamp,
} = authSlice.actions;
