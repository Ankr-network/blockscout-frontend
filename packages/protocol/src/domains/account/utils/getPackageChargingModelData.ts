import { BundlePaymentPlan, BundleType, MyBundleStatus } from 'multirpc-sdk';
import { t } from '@ankr.com/common';

import {
  EChargingModel,
  IPackageBalance,
  IPackageChargingModelData,
} from 'modules/payments/types';
import { getDateFromUnixSeconds } from 'modules/common/utils/getDateFromUnixSeconds';

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

// this value is hardcoded because package is no longer listed in bundles response.
// see details here: https://ankrnetwork.atlassian.net/browse/MRPC-4755
// and related discussion: https://ankr.slack.com/archives/C0482JES71T/p1713209633085639
const PACKAGE_REQUESTS_LIMIT = 30000000;

export const getPackageChargingModelData = ({
  bundlePaymentPlans,
  packageChargingModel,
}: IGetPackageDataProps) => {
  const balanceInRequests = packageChargingModel.counters.reduce(
    (result, counter) => result + Number(counter.count) || 0,
    0,
  );

  const balanceUsd =
    (balanceInRequests * CREDITS_TO_REQUESTS_RATE) / CREDITS_TO_USD_RATE;

  const relatedBundle = bundlePaymentPlans?.find(
    ({ bundle }) => bundle.bundle_id === packageChargingModel.bundleId,
  );

  const wholeAmountOfRequests =
    relatedBundle?.bundle.limits.find(({ type }) => type === BundleType.QTY)
      ?.limit || PACKAGE_REQUESTS_LIMIT;

  const usedRequestsCount = wholeAmountOfRequests - balanceInRequests;
  const usedRequestsPercent = (usedRequestsCount * 100) / wholeAmountOfRequests;

  const progressLabel = t(
    'account.account-details.balance-widget.used-credits-label',
    {
      usedCount: usedRequestsCount,
      wholeAmountCount: wholeAmountOfRequests,
      usedPercent: usedRequestsPercent,
    },
  );

  const chargingModelPackage: IPackageChargingModelData = {
    balance: {
      balanceInRequests,
      balanceUsd,
    },
    expires: packageChargingModel.expires,
    isExpired: usedRequestsPercent >= 100,
    progressLabel,
    progressLabelData: {
      usedCount: usedRequestsCount,
      wholeAmountCount: wholeAmountOfRequests,
      usedPercent: usedRequestsPercent,
    },
    progressValue: usedRequestsPercent,
    type: EChargingModel.Package,
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
    balance,
    expires: result.expires || current.expires,
    isExpired: result.isExpired && current.isExpired,
    progressLabel: '',
    progressLabelData,
    progressValue: 0, // we are not aggregating this value here because need to summarize all usedCount and wholeAmountCount first
    type: EChargingModel.Package,
  };
};

export const getAggregatedPackageModelData = ({
  bundlePaymentPlans,
  packageChargingModels,
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

export const getAggregatedPackageModelsData = ({
  bundlePaymentPlans,
  packageChargingModels,
}: IGetPackagesAggregatedDataProps) => {
  return packageChargingModels
    .map(packageChargingModel =>
      getPackageChargingModelData({
        packageChargingModel,
        bundlePaymentPlans,
      }),
    )
    .map(packageChargingModel => {
      const progressValue =
        (packageChargingModel.progressLabelData.usedCount * 100) /
        packageChargingModel.progressLabelData.wholeAmountCount;

      const progressLabelData = {
        ...packageChargingModel.progressLabelData,
        usedPercent: progressValue,
      };

      return {
        ...packageChargingModel,
        maxLabel: t('account.account-details.balance-widget.expires', {
          date: getDateFromUnixSeconds(packageChargingModel.expires),
        }),
        progressValue,
        progressLabelData,
        progressLabel: t(
          'account.account-details.balance-widget.used-credits-label',
          progressLabelData,
        ),
      };
    });
};
