import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit';

import { RootState } from 'store';
import { Chain } from 'modules/chains/types';
import { selectPublicBlockchains } from 'modules/chains/store/selectors';

export interface ChainsSliceInitialState {
  originURL?: string;
}

const initialState: ChainsSliceInitialState = {
  originURL: undefined,
};

export const chainsSlice = createSlice({
  name: 'chains/originURL',
  initialState,
  reducers: {
    setOriginChainURL: (
      state,
      { payload: originURL }: PayloadAction<string>,
    ) => {
      state.originURL = originURL;
    },
    resetOriginChainURL: state => {
      state.originURL = initialState.originURL;
    },
  },
});

export const selectChainsOriginURL = (state: RootState) =>
  state.chainsOriginURL.originURL;

const getBeacons = (chains: Chain[] = []): Chain[] =>
  chains.flatMap(
    ({
      beacons = [],
      devnets = [],
      extenders = [],
      extensions = [],
      testnets = [],
    }) => [
      ...beacons,
      ...getBeacons(devnets),
      ...getBeacons(extenders),
      ...getBeacons(testnets),
      ...getBeacons(extensions),
    ],
  );

export const selectBeacons = createSelector(selectPublicBlockchains, chains =>
  getBeacons(chains),
);

export const { resetOriginChainURL, setOriginChainURL } = chainsSlice.actions;
