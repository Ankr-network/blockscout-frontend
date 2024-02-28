import {
  BundleCounter,
  BundleLimitType,
  BundlePaymentPlan,
  MyBundleStatus,
} from 'multirpc-sdk';
import { t } from '@ankr.com/common';

import { EChargingModel, IDealChargingModelData } from 'modules/billing/types';

import { CREDITS_TO_REQUESTS_RATE, CREDITS_TO_USD_RATE } from '../store/const';

interface IGetDealDataProps {
  dealChargingModel: MyBundleStatus;
  bundlePaymentPlans: BundlePaymentPlan[];
}

export const getDealChargingModelData = ({
  dealChargingModel,
  bundlePaymentPlans,
}: IGetDealDataProps) => {
  const balanceApiCredits =
    dealChargingModel.counters?.find(
      counter => counter.type === BundleCounter.BUNDLE_COUNTER_TYPE_COST,
    )?.count || 0;

  const balanceUsd = Number(balanceApiCredits) / CREDITS_TO_USD_RATE;
  const balanceInRequests =
    Number(balanceApiCredits) / CREDITS_TO_REQUESTS_RATE;

  const relatedBundle = bundlePaymentPlans?.find(
    ({ bundle }) => bundle.bundle_id === dealChargingModel.bundleId,
  );

  const wholeAmountOfCredits = relatedBundle?.bundle.limits.find(
    ({ type }) => type === BundleLimitType.COST,
  )?.limit;

  const usedRequestsCount = wholeAmountOfCredits
    ? wholeAmountOfCredits - Number(balanceApiCredits)
    : 0;

  const usedRequestsPercent = wholeAmountOfCredits
    ? (usedRequestsCount * 100) / wholeAmountOfCredits
    : 0;

  const progressLabel = t(
    'account.account-details.balance-widget.used-credits-label',
    {
      usedCount: usedRequestsCount,
      wholeAmountCount: wholeAmountOfCredits,
      usedPercent: usedRequestsPercent,
    },
  );

  const maxLabel = t('account.account-details.balance-widget.expires', {
    date: new Date(Number(dealChargingModel.expires)),
  });

  const chargingModelDeal: IDealChargingModelData = {
    type: EChargingModel.Deal,
    balance: {
      balanceApiCredits: balanceApiCredits.toString(),
      balanceUsd: balanceUsd.toString(),
      balanceInRequests: balanceInRequests.toString(),
    },
    progressValue: usedRequestsPercent,
    progressLabel,
    maxLabel,
    expires: dealChargingModel.expires,
  };

  return chargingModelDeal;
};
