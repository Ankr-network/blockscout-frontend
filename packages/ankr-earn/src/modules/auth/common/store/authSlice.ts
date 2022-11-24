import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'store';

import { AvailableWriteProviders } from '@ankr.com/provider';

import { ProvidersMap } from '../../../common/types';

export interface IProviderStatus {
  address?: string;
  isActive: boolean;
  chainId?: number | string | null;
  walletId?: string;
  wallet?: string;
}

interface ISetProviderStatusPayload extends IProviderStatus {
  providerId: keyof ProvidersMap;
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
        chainId:
          state[action.payload.providerId]?.chainId ?? action.payload.chainId,
      };
    },
    setChainId: (state, action: PayloadAction<ISetProviderStatusPayload>) => {
      state[action.payload.providerId] = {
        ...(state[action.payload.providerId] ?? {}),
        chainId: action.payload.chainId,
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
  return state.polkadotCompatible;
});

export const selectQueriesData = createSelector(
  selectReqQueries,
  state => state,
);

export const { setProviderStatus, setChainId } = authSlice.actions;
