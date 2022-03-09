import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'store';

import { AvailableWriteProviders } from 'provider';

interface IProviderStatus {
  isActive: boolean;
  walletId?: string;
}

interface ISetProviderStatusPayload extends IProviderStatus {
  providerId: AvailableWriteProviders;
}

export type IAuthSlice = Record<string, IProviderStatus>;

const initialState: IAuthSlice = {};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setProviderStatus: (
      state,
      action: PayloadAction<ISetProviderStatusPayload>,
    ) => {
      state[action.payload.providerId] = {
        isActive: action.payload.isActive,
        walletId: action.payload.walletId,
      };
    },
  },
});

const selectAuth = (state: RootState) => state.auth;

export const selectEthProviderData = createSelector(selectAuth, state => {
  return state[AvailableWriteProviders.ethCompatible];
});

export const { setProviderStatus } = authSlice.actions;
