import { BundleType, BundlePaymentPlan, MyBundleStatus } from 'multirpc-sdk';
import { t } from '@ankr.com/common';

import {
  EChargingModel,
  IPackageChargingModelData,
} from 'modules/billing/types';

import { CREDITS_TO_REQUESTS_RATE, CREDITS_TO_USD_RATE } from '../store/const';

interface IGetPackageDataProps {
  packageChargingModel: MyBundleStatus;
  bundlePaymentPlans: BundlePaymentPlan[];
}

export const getPackageChargingModelData = ({
  packageChargingModel,
  bundlePaymentPlans,
}: IGetPackageDataProps) => {
  const balanceInRequests = packageChargingModel.counters.reduce(
    (result, counter) => result + Number(counter.count) ?? 0,
    0,
  );

  const balanceUsd =
    (balanceInRequests * CREDITS_TO_REQUESTS_RATE) / CREDITS_TO_USD_RATE;

  const relatedBundle = bundlePaymentPlans?.find(
    ({ bundle }) => bundle.bundle_id === packageChargingModel.bundleId,
  );

  const wholeAmountOfRequests = relatedBundle?.bundle.limits.find(
    ({ type }) => type === BundleType.QTY,
  )?.limit;

  const usedRequestsCount = wholeAmountOfRequests
    ? wholeAmountOfRequests - balanceInRequests
    : 0;

  const usedRequestsPercent = wholeAmountOfRequests
    ? (usedRequestsCount * 100) / wholeAmountOfRequests
    : 0;

  const progressLabel = t(
    'account.account-details.balance-widget.used-credits-label',
    {
      usedCount: usedRequestsCount,
      wholeAmountCount: wholeAmountOfRequests,
      usedPercent: usedRequestsPercent,
    },
  );

  const chargingModelPackage: IPackageChargingModelData = {
    type: EChargingModel.Package,
    balance: {
      balanceInRequests: balanceInRequests.toString(),
      balanceUsd: balanceUsd.toString(),
    },
    progressValue: usedRequestsPercent,

    isExpired: usedRequestsPercent >= 100,
    progressLabel,
  };

  return chargingModelPackage;
};
