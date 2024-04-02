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

  const wholeAmountOfRequests =
    relatedBundle?.bundle.limits.find(({ type }) => type === BundleType.QTY)
      ?.limit || 0;

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
      balanceInRequests,
      balanceUsd,
    },
    progressValue: usedRequestsPercent,

    isExpired: usedRequestsPercent >= 100,
    progressLabel,

    progressLabelData: {
      usedCount: usedRequestsCount,
      wholeAmountCount: wholeAmountOfRequests,
      usedPercent: usedRequestsPercent,
    },
  };

  return chargingModelPackage;
};

interface IGetPackagesDataProps {
  packageChargingModels: MyBundleStatus[];
  bundlePaymentPlans: BundlePaymentPlan[];
}

const aggregatePackageModelsData = (
  result: IPackageChargingModelData,
  current: IPackageChargingModelData,
): IPackageChargingModelData => {
  const { progressLabelData: resultProgressLabelData, balance: resultBalance } =
    result;

  const {
    progressLabelData: currentProgressLabelData,
    balance: currentBalance,
  } = current;

  const progressLabelData = {
    usedCount:
      resultProgressLabelData.usedCount + currentProgressLabelData.usedCount,
    wholeAmountCount:
      resultProgressLabelData.wholeAmountCount +
      currentProgressLabelData.wholeAmountCount,
    usedPercent: 0, // we are not aggregating this value here because need to summarize all usedCount and wholeAmountCount first
  };

  return {
    type: EChargingModel.Package,
    balance: {
      balanceInRequests:
        resultBalance.balanceInRequests + currentBalance.balanceInRequests,
      balanceUsd: resultBalance.balanceUsd + currentBalance.balanceUsd,
    },
    progressValue: result.progressValue + current.progressValue,
    isExpired: result.isExpired && current.isExpired,
    progressLabelData,
    progressLabel: '', // progressLabel is not used in this context. added here just for types compatibility
  };
};

export const getAggregatedPackageModelsData = ({
  packageChargingModels,
  bundlePaymentPlans,
}: IGetPackagesDataProps) => {
  const mappedData = packageChargingModels.map(packageChargingModel =>
    getPackageChargingModelData({ packageChargingModel, bundlePaymentPlans }),
  );

  const summaryPackageData = mappedData.reduce(aggregatePackageModelsData);

  const summaryUsedPercent =
    (summaryPackageData.progressLabelData.usedCount * 100) /
    summaryPackageData.progressLabelData.wholeAmountCount;

  const progressLabelData = {
    ...summaryPackageData.progressLabelData,
    usedPercent: summaryUsedPercent,
  };

  return {
    ...summaryPackageData,
    progressLabelData,
    progressLabel: t(
      'account.account-details.balance-widget.used-credits-label',
      progressLabelData,
    ),
  };
};
