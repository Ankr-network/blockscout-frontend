import { EEthereumNetworkId, IWalletMeta } from '@ankr.com/provider';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EthAddressType } from 'multirpc-sdk';

import { RootState } from 'store';

export interface IWalletSlice {
  address?: string;
  walletMeta?: IWalletMeta;
  networkId?: EEthereumNetworkId;
  ethAddressType?: EthAddressType;
  trackingWalletName?: string;
}

const initialState: IWalletSlice = {
  address: '',
};

export const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    setWalletData: (state, action: PayloadAction<IWalletSlice>) => {
      Object.assign(state, action.payload);
    },
    resetWalletData: state => {
      Object.assign(state, initialState);
    },
  },
});

export const selectWalletData: (state: RootState) => IWalletSlice = state => {
  if (state.wallet) {
    return state.wallet;
  }

  return { address: '' };
};

export const { setWalletData, resetWalletData } = walletSlice.actions;
