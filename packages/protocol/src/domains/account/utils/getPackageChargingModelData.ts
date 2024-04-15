import { BundleType, BundlePaymentPlan, MyBundleStatus } from 'multirpc-sdk';
import { t } from '@ankr.com/common';

import {
  EChargingModel,
  IPackageBalance,
  IPackageChargingModelData,
} from 'modules/billing/types';

import { CREDITS_TO_REQUESTS_RATE, CREDITS_TO_USD_RATE } from '../store/const';

interface IGetPackageDataProps {
  packageChargingModel: MyBundleStatus;
  bundlePaymentPlans: BundlePaymentPlan[];
}

interface IGetPackagesAggregatedDataProps {
  packageChargingModels: MyBundleStatus[];
  bundlePaymentPlans: BundlePaymentPlan[];
}

interface IProgressLabelData {
  usedCount: number;
  wholeAmountCount: number;
  usedPercent: number;
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

const calculateProgressLabelData = (
  resultProgressLabelData: IProgressLabelData,
  currentProgressLabelData: IProgressLabelData,
): IProgressLabelData => ({
  usedCount:
    resultProgressLabelData.usedCount + currentProgressLabelData.usedCount,
  wholeAmountCount:
    resultProgressLabelData.wholeAmountCount +
    currentProgressLabelData.wholeAmountCount,
  usedPercent: 0, // we are not aggregating this value here because need to summarize all usedCount and wholeAmountCount first
});

const calculateBalance = (
  resultBalance: IPackageBalance,
  currentBalance: IPackageBalance,
): IPackageBalance => ({
  balanceInRequests:
    resultBalance.balanceInRequests + currentBalance.balanceInRequests,
  balanceUsd: resultBalance.balanceUsd + currentBalance.balanceUsd,
});

const aggregatePackageModelsData = (
  result: IPackageChargingModelData,
  current: IPackageChargingModelData,
): IPackageChargingModelData => {
  const progressLabelData = calculateProgressLabelData(
    result.progressLabelData,
    current.progressLabelData,
  );
  const balance = calculateBalance(result.balance, current.balance);

  return {
    type: EChargingModel.Package,
    balance,
    progressValue: 0, // we are not aggregating this value here because need to summarize all usedCount and wholeAmountCount first
    isExpired: result.isExpired && current.isExpired,
    progressLabelData,
    progressLabel: '',
  };
};

export const getAggregatedPackageModelsData = ({
  packageChargingModels,
  bundlePaymentPlans,
}: IGetPackagesAggregatedDataProps) => {
  const mappedData = packageChargingModels.map(packageChargingModel =>
    getPackageChargingModelData({ packageChargingModel, bundlePaymentPlans }),
  );

  const summaryPackageData = mappedData.reduce(aggregatePackageModelsData);

  const progressValue =
    (summaryPackageData.progressLabelData.usedCount * 100) /
    summaryPackageData.progressLabelData.wholeAmountCount;

  const progressLabelData = {
    ...summaryPackageData.progressLabelData,
    usedPercent: progressValue,
  };

  return {
    ...summaryPackageData,
    progressValue,
    progressLabelData,
    progressLabel: t(
      'account.account-details.balance-widget.used-credits-label',
      progressLabelData,
    ),
  };
};
