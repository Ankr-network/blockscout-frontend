import { BundleType, BundlePaymentPlan, MyBundleStatus } from 'multirpc-sdk';
import { t } from '@ankr.com/common';

import { B2B_REFERRAL_PROGRAMS } from 'modules/referralProgram/const';
import { EChargingModel, IDealChargingModelData } from 'modules/payments/types';
import { getDateFromUnixSeconds } from 'modules/common/utils/getDateFromUnixSeconds';

import { CREDITS_TO_REQUESTS_RATE, CREDITS_TO_USD_RATE } from '../store/const';

interface IGetDealDataProps {
  dealChargingModel: MyBundleStatus;
  bundlePaymentPlans: BundlePaymentPlan[];
}

export const getDealChargingModelData = ({
  bundlePaymentPlans,
  dealChargingModel,
}: IGetDealDataProps) => {
  const balanceApiCredits =
    Number(
      dealChargingModel.counters?.find(
        counter => counter.type === BundleType.COST,
      )?.count,
    ) || 0;

  const balanceUsd = balanceApiCredits / CREDITS_TO_USD_RATE;
  const balanceInRequests = balanceApiCredits / CREDITS_TO_REQUESTS_RATE;

  const relatedBundle = bundlePaymentPlans?.find(
    ({ bundle }) => bundle.bundle_id === dealChargingModel.bundleId,
  );

  const wholeAmountOfCredits =
    relatedBundle?.bundle.limits.find(({ type }) => type === BundleType.COST)
      ?.limit || 0;

  const usedRequestsCount = wholeAmountOfCredits
    ? wholeAmountOfCredits - Number(balanceApiCredits)
    : 0;

  const usedRequestsPercent = wholeAmountOfCredits
    ? (usedRequestsCount * 100) / wholeAmountOfCredits
    : 0;

  const progressData = {
    usedCount: usedRequestsCount,
    wholeAmountCount: wholeAmountOfCredits,
    usedPercent: usedRequestsPercent,
  };

  const progressLabel = t(
    'account.account-details.balance-widget.used-credits-label',
    progressData,
  );

  const maxLabel = t('account.account-details.balance-widget.expires', {
    date: getDateFromUnixSeconds(dealChargingModel.expires),
  });

  const isPromo = B2B_REFERRAL_PROGRAMS.some(
    ({ bundleId }) => bundleId === dealChargingModel.bundleId,
  );

  const chargingModelDeal: IDealChargingModelData = {
    type: isPromo ? EChargingModel.Promo : EChargingModel.Deal,
    balance: {
      balanceApiCredits,
      balanceUsd,
      balanceInRequests,
    },
    progressData,
    progressValue: usedRequestsPercent,
    progressLabel,
    maxLabel,
    expires: dealChargingModel.expires,
    price: +(relatedBundle?.price?.amount || 0),
    isPromo,
  };

  return chargingModelDeal;
};

const aggregateDealData = (
  acc: IDealChargingModelData,
  dealData: IDealChargingModelData,
): IDealChargingModelData => {
  const { balance, expires, progressData } = dealData;
  const { balanceApiCredits, balanceInRequests, balanceUsd } = balance;
  const { usedCount, wholeAmountCount } = progressData;
  const usedPercent = (usedCount * 100) / wholeAmountCount;

  acc.balance.balanceApiCredits += balanceApiCredits;
  acc.balance.balanceUsd += balanceUsd;
  acc.balance.balanceInRequests += balanceInRequests;
  acc.expires = Math.max(acc.expires, expires);
  acc.progressData = {
    usedCount: acc.progressData.usedCount + usedCount,
    wholeAmountCount: acc.progressData.wholeAmountCount + wholeAmountCount,
    usedPercent: acc.progressData.usedPercent + usedPercent,
  };

  return acc;
};

export const getAggregatedDealChargingModelData = ({
  bundlePaymentPlans,
  dealChargingModels,
}: {
  dealChargingModels: MyBundleStatus[];
  bundlePaymentPlans: BundlePaymentPlan[];
}): IDealChargingModelData => {
  const mappedDealData = dealChargingModels.map(dealChargingModel =>
    getDealChargingModelData({
      dealChargingModel,
      bundlePaymentPlans,
    }),
  );

  const aggregatedDealData = mappedDealData.reduce(aggregateDealData);

  const progressValue =
    (aggregatedDealData.progressData.usedCount * 100) /
    aggregatedDealData.progressData.wholeAmountCount;

  const progressData = {
    ...aggregatedDealData.progressData,
    usedPercent: progressValue,
  };

  return {
    ...aggregatedDealData,
    type: EChargingModel.Deal,
    progressValue,
    progressData,
    progressLabel: t(
      'account.account-details.balance-widget.used-credits-label',
      progressData,
    ),
    maxLabel: t('account.account-details.balance-widget.expires', {
      date: getDateFromUnixSeconds(aggregatedDealData.expires),
    }),
  };
};

export const getAggregatedDealChargingModelsData = ({
  bundlePaymentPlans,
  dealChargingModels,
}: {
  dealChargingModels: MyBundleStatus[];
  bundlePaymentPlans: BundlePaymentPlan[];
}): IDealChargingModelData[] => {
  return dealChargingModels.map(dealChargingModel =>
    getDealChargingModelData({
      dealChargingModel,
      bundlePaymentPlans,
    }),
  );
};
