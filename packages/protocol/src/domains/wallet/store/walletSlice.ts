import { EEthereumNetworkId, IWalletMeta } from '@ankr.com/provider';
import { Web3Address } from 'multirpc-sdk';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IWalletSlice {
  address?: Web3Address;
  meta?: IWalletMeta;
  networkId?: EEthereumNetworkId;
}

const initialState: IWalletSlice = {};

export const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    setWalletAddress: (state, action: PayloadAction<string>) => {
      state.address = action.payload;
    },
    setWalletMeta: (state, action: PayloadAction<IWalletMeta>) => {
      state.meta = action.payload;
    },
    setNetworkId: (state, action: PayloadAction<EEthereumNetworkId>) => {
      state.networkId = action.payload;
    },
    setWalletState: (state, action: PayloadAction<IWalletSlice>) => {
      Object.assign(state, action.payload);
    },
    resetWalleState: state => {
      Object.assign(state, initialState);
    },
  },
});

export const {
  resetWalleState,
  setNetworkId,
  setWalletAddress,
  setWalletMeta,
  setWalletState,
} = walletSlice.actions;
