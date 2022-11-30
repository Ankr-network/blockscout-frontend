import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'store';

import { Address, AvailableWriteProviders } from '@ankr.com/provider';

import {
  AvailableStakingWriteProviders,
  ExtraWriteProviders,
} from 'modules/common/types';

export interface IProviderStatus {
  address?: string;
  addresses?: Address[];
  isActive: boolean;
  providerId: AvailableStakingWriteProviders;
  chainId?: number | string | null;
  walletId?: string;
  wallet?: string;
  walletIcon?: string;
  walletName?: string;
}

export type IAuthSlice = Record<string, IProviderStatus>;

const initialState: IAuthSlice = {};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setProviderStatus: (state, action: PayloadAction<IProviderStatus>) => {
      state[action.payload.providerId] = {
        isActive: action.payload.isActive,
        address: action.payload.address,
        addresses: action.payload.addresses,
        providerId: action.payload.providerId,
        walletId: action.payload.walletId,
        wallet: action.payload.wallet,
        walletIcon: action.payload.walletIcon,
        walletName: action.payload.walletName,
        chainId:
          state[action.payload.providerId]?.chainId ?? action.payload.chainId,
      };
    },
    setChainId: (state, action: PayloadAction<IProviderStatus>) => {
      state[action.payload.providerId] = {
        ...(state[action.payload.providerId] ?? {}),
        chainId: action.payload.chainId,
      };
    },
    setAddress: (
      state,
      action: PayloadAction<Omit<IProviderStatus, 'isActive'>>,
    ) => {
      state[action.payload.providerId] = {
        ...(state[action.payload.providerId] ?? {}),
        address: action.payload.address,
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
  return state[ExtraWriteProviders.polkadotCompatible];
});

export const selectSuiProviderData = createSelector(selectAuth, state => {
  return state[ExtraWriteProviders.suiCompatible];
});

export const selectQueriesData = createSelector(
  selectReqQueries,
  state => state,
);

export const { setAddress, setProviderStatus, setChainId } = authSlice.actions;
