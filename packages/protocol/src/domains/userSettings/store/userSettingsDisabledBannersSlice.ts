import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Web3Address } from 'multirpc-sdk';
import { RootState } from 'store';
import { UserSettingsBanners } from '../types';

interface IDisableBannerPayload {
  bannerToDisable: UserSettingsBanners;
  address: Web3Address;
}

type AddressMap = Partial<Record<Web3Address, true>>;

type DisabledBannersState = Partial<Record<UserSettingsBanners, AddressMap>>;

const initialState: DisabledBannersState = {};

export const userSettingsDisabledBannersSlice = createSlice({
  name: 'userSettings/disabledBanners',
  initialState,
  reducers: {
    disableBanner: (
      state: DisabledBannersState,
      {
        payload: { bannerToDisable, address },
      }: PayloadAction<IDisableBannerPayload>,
    ) => {
      state[bannerToDisable] = { ...state[bannerToDisable], [address]: true };
    },
  },
});

export const selectIsBannerDisabled =
  (banner: UserSettingsBanners, address: Web3Address) =>
  (state: RootState): boolean =>
    state.userSettingsDisabledBanners[banner]?.[address] ?? false;

export const { disableBanner } = userSettingsDisabledBannersSlice.actions;
