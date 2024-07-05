import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'store';
import { selectAddress } from 'domains/auth/store';
import { selectUserGroupConfigByAddress } from 'domains/userGroup/store';

import { selectPersonalPremiumStatus } from '../actions/fetchPersonalPremiumStatus';

export const selectReferralProgramState = (state: RootState) =>
  state.referralProgram;

export const selectReferralCode = createSelector(
  selectReferralProgramState,
  state => state.referralCode,
);

export const selectIsAccountEligible = createSelector(
  selectPersonalPremiumStatus,
  selectAddress,
  selectUserGroupConfigByAddress,
  (premiumStatus, authAddress, groupConfig) => {
    const groupAddress = groupConfig.selectedGroupAddress;

    const isPersonalAccount =
      !groupAddress || authAddress.toLowerCase() === groupAddress.toLowerCase();

    return isPersonalAccount && Boolean(premiumStatus?.isFreemium);
  },
);
