import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'store';

export const selectWalletState = (state: RootState) => state.wallet;

export const selectWalletAddress = createSelector(
  selectWalletState,
  state => state.address,
);

export const selectWalletMeta = createSelector(
  selectWalletState,
  state => state.meta,
);

export const selectNetworkId = createSelector(
  selectWalletState,
  state => state.networkId,
);
