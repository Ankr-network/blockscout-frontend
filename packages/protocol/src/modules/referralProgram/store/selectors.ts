import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'store';
import { selectAddress, selectHasFreemium } from 'domains/auth/store';
import { selectUserGroupConfigByAddress } from 'domains/userGroup/store';

export const selectReferralProgramState = (state: RootState) =>
  state.referralProgram;

export const selectReferralCode = createSelector(
  selectReferralProgramState,
  state => state.referralCode,
);

export const selectIsAccountEligible = createSelector(
  selectHasFreemium,
  selectAddress,
  selectUserGroupConfigByAddress,
  (hasFreemium, authAddress, groupConfig) => {
    const groupAddress = groupConfig.selectedGroupAddress;

    const isPersonalAccount =
      !groupAddress || authAddress.toLowerCase() === groupAddress.toLowerCase();

    return isPersonalAccount && hasFreemium;
  },
);
