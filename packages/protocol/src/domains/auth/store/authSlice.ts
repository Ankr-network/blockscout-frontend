import {
  EthAddressType,
  IJwtToken,
  OauthLoginProvider,
  WorkerTokenData,
} from 'multirpc-sdk';
import { IWalletMeta } from '@ankr.com/provider';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { MultiService } from 'modules/api/MultiService';
import { RootState } from 'store';

import { clearCookie, getCookieByName, setCookie } from './cookie';

const WORKER_TOKEN_DATA_KEY = 'WORKER_TOKEN_DATA_KEY';
let WORKER_TOKEN_DATA: IAuthSlice['workerTokenData'];

export const GOOGLE_PROVIDER = 'google';

export type OauthProviderType = OauthLoginProvider | typeof GOOGLE_PROVIDER;

export interface IAuthSlice {
  address?: string;
  authorizationToken?: string;
  credentials?: IJwtToken;
  email?: string;
  encryptionPublicKey?: string;
  ethAddressType?: EthAddressType;
  hasOauthLogin?: boolean;
  hasWeb3Connection?: boolean;
  isCardPayment?: boolean;
  trackingWalletName?: string;
  walletMeta?: IWalletMeta;
  workerTokenData?: WorkerTokenData;
  isInstantJwtParticipant?: boolean;
  hasWeb3Autoconnect?: boolean;
  oauthProviders?: OauthProviderType[];
  loginName?: string;
}

const initialState: IAuthSlice = {
  address: '',
  oauthProviders: [],
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
    resetAuthData: state => {
      clearCookie(WORKER_TOKEN_DATA_KEY);
      WORKER_TOKEN_DATA = undefined;

      Object.keys(state).forEach(key => {
        const objKey = key as keyof IAuthSlice;

        // @ts-ignore
        state[objKey] = undefined;
      });
    },
  },
});

export const selectAuthData: (state: RootState) => IAuthSlice = (
  state: RootState,
): IAuthSlice => {
  if (state.auth) {
    if (WORKER_TOKEN_DATA === undefined) {
      WORKER_TOKEN_DATA = getCookieByName(WORKER_TOKEN_DATA_KEY);

      const service = MultiService.getService();

      if (state.auth?.authorizationToken) {
        service.getAccountGateway().addToken(state.auth?.authorizationToken);
      }
    }

    return {
      ...state.auth,
      workerTokenData: WORKER_TOKEN_DATA,
    };
  }

  return { address: '' };
};

export const { setAuthData, resetAuthData } = authSlice.actions;
