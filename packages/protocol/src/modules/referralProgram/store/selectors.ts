import { createSelector } from '@reduxjs/toolkit';

import { EMilliSeconds } from 'modules/common/constants/const';
import { RootState } from 'store';
import { getDealChargingModelData } from 'domains/account/utils/getDealChargingModelData';
import { selectAddress } from 'domains/auth/store';
import {
  selectBundlePaymentPlans,
  selectHasActiveDeal,
  selectMyBundlesStatus,
} from 'domains/account/store/selectors';
import { selectIsPAYGDepositMade } from 'domains/account/actions/checkPAYGDeposit';
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

export const selectPromoBundle = createSelector(
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

      return promoBundle;
    }

    return undefined;
  },
);

export const selectPromoChargingModel = createSelector(
  selectPromoBundle,
  selectBundlePaymentPlans,
  (dealChargingModel, bundlePaymentPlans) => {
    if (dealChargingModel) {
      return getDealChargingModelData({
        bundlePaymentPlans,
        dealChargingModel,
      });
    }

    return undefined;
  },
);

export const selectHasPromoBundle = createSelector(
  selectPromoBundle,
  promoBundle => {
    const expiresMs = (promoBundle?.expires ?? 0) * EMilliSeconds.Second;

    const isPromoBundleExpired = new Date() > new Date(expiresMs);

    return !isPromoBundleExpired;
  },
);

export const selectHasReferralBonusBanner = createSelector(
  selectReferrer,
  selectIsPAYGDepositMade,
  selectHasActiveDeal,
  (referrer, isPAYGDepositMade = false, isDealDepositMade) => {
    const hasReferrer = Boolean(referrer);

    const isDepositMade = isPAYGDepositMade || isDealDepositMade;

    return hasReferrer && !isDepositMade;
  },
);
