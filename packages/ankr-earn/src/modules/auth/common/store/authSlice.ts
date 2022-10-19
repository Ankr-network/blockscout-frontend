import { AvailableWriteProviders } from '@ankr.com/provider-core';
import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'store';

export interface IProviderStatus {
  address?: string;
  isActive: boolean;
  walletId?: string;
  wallet?: string;
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
        address: action.payload.address,
        walletId: action.payload.walletId,
        wallet: action.payload.wallet,
      };
    },
  },
});

const selectAuth = (state: RootState) => state.auth;
const selectReqQueries = (state: RootState) => state.requests.queries;

export const selectProvidersData = createSelector(selectAuth, state => state);
export const selectEthProviderData = createSelector(selectAuth, state => {
  return state[AvailableWriteProviders.ethCompatible];
});
export const selectPolkadotProviderData = createSelector(selectAuth, state => {
  return state[AvailableWriteProviders.polkadotCompatible];
});

export const selectQueriesData = createSelector(
  selectReqQueries,
  state => state,
);

export const { setProviderStatus } = authSlice.actions;
