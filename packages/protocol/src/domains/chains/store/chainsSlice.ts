import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit';

import { RootState } from 'store';
import { IApiChain } from '../api/queryChains';
import { ChainsRoutesConfig } from '../routes';
import { chainsFetchPublicChains } from '../actions/public/fetchPublicChains';

const initialState = {
  originURL: ChainsRoutesConfig.chains.path,
};

export const chainsSlilce = createSlice({
  name: 'chains/originURL',
  initialState,
  reducers: {
    setOriginChainURL: (
      state,
      { payload: originURL }: PayloadAction<string>,
    ) => {
      state.originURL = originURL;
    },
  },
});

export const selectChainsOriginURL = (state: RootState) =>
  state.chainsOriginURL.originURL;

const getBeacons = (chains: IApiChain[] = []): IApiChain[] =>
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

export const selectBeacons = createSelector(
  chainsFetchPublicChains.select(),
  ({ data: { chains = [] } = {} }) => getBeacons(chains),
);

export const { setOriginChainURL } = chainsSlilce.actions;
