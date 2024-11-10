import {
  EthAddressType,
  IJwtToken,
  OauthLoginProvider,
  WorkerTokenData,
} from 'multirpc-sdk';
import { IWalletMeta } from '@ankr.com/provider';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from 'store';

export interface IAuthSlice {
  authAddress?: string;
  authAddressType?: EthAddressType;
  authorizationToken?: string;
  credentials?: IJwtToken;
  email?: string;
  encryptionPublicKey?: string;
  hasOauthLogin?: boolean;
  hasWeb3Autoconnect?: boolean;
  hasWeb3Connection?: boolean;
  isCardPayment?: boolean;
  isInstantJwtParticipant?: boolean;
  loginName?: string;
  oauthProviders?: OauthLoginProvider[];
  trackingWalletName?: string;
  walletMeta?: IWalletMeta;
  workerTokenData?: WorkerTokenData;
}

const initialState: IAuthSlice = {
  oauthProviders: [],
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthData: (state, action: PayloadAction<IAuthSlice>) => {
      Object.assign(state, action.payload);
    },
    resetAuthData: state => {
      Object.assign(state, initialState);
    },
  },
});

export const selectAuthData = (state: RootState) => state.auth;

export const { resetAuthData, setAuthData } = authSlice.actions;
