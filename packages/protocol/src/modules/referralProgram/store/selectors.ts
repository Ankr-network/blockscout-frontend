import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'store';
import { selectAddress } from 'domains/auth/store';
import { selectMyBundlesStatus } from 'domains/account/store/selectors';
import { selectUserGroupConfigByAddress } from 'domains/userGroup/store';

import { getReferralProgram } from '../utils/getReferralProgram';
import { selectPersonalPremiumStatus } from '../actions/fetchPersonalPremiumStatus';
import { selectReferrer } from '../actions/fetchReferrer';

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

export const selectIsPromo = createSelector(
  selectReferrer,
  selectMyBundlesStatus,
  (referrer, myBundles) => {
    const referralCode = referrer?.referral_code;

    const referralProgram = getReferralProgram(referralCode);

    if (referralProgram) {
      const { bundleId } = referralProgram;

      const promoBundle = myBundles.find(
        bundle => bundle.bundleId === bundleId,
      );

      return Boolean(promoBundle);
    }

    return false;
  },
);
