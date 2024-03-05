import BigNumber from 'bignumber.js';
import {
  BalanceLevel,
  BundleType,
  BundlePaymentPlan,
  ISubscriptionsItem,
  MyBundleStatusCounter,
} from 'multirpc-sdk';
import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'store';
import { ZERO } from 'modules/common/constants/const';
import {
  EChargingModel,
  IChargingModelData,
  IFreeChargingModelData,
  IPAYGChargingModelData,
} from 'modules/billing/types';

import {
  ALL_BLOCKCHAINS_PATH,
  ANKR_TO_CREDITS_RATE,
  CREDITS_TO_REQUESTS_RATE,
  DEFAULT_BALANCE,
} from './const';
import { fetchBalance } from '../actions/balance/fetchBalance';
import { fetchBundlePaymentPlans } from '../actions/bundles/fetchBundlePaymentPlans';
import { fetchMyBundles } from '../actions/bundles/fetchMyBundles';
import { fetchMyBundlesStatus } from '../actions/bundles/fetchMyBundlesStatus';
import { fetchMySubscriptions } from '../actions/subscriptions/fetchMySubscriptions';
import { getDealChargingModelData } from '../utils/getDealChargingModelData';
import { getPackageChargingModelData } from '../utils/getPackageChargingModelData';

export const selectBundlePaymentPlansState = createSelector(
  fetchBundlePaymentPlans.select(),
  state => state,
);

export const selectBundlePaymentPlans = createSelector(
  selectBundlePaymentPlansState,
  ({ data = [] }) =>
    data.map<BundlePaymentPlan>(bundle => ({
      ...bundle,
      price: {
        ...bundle.price,
        amount: (Number(bundle.price.amount) ?? 0).toString(),
      },
    })),
);

export const selectFirstBundlePaymentPlan = createSelector(
  selectBundlePaymentPlans,
  ([bundle]): BundlePaymentPlan | undefined => bundle,
);

export const selectBundlePaymentPlansLoading = createSelector(
  selectBundlePaymentPlansState,
  ({ isLoading }) => isLoading,
);

export const selectBundlePaymentPlansFetching = createSelector(
  selectBundlePaymentPlansState,
  ({ data, isLoading }) => isLoading && typeof data === 'undefined',
);

export const selectBundlePaymentPlanByBundleId = createSelector(
  selectBundlePaymentPlans,
  (_state: RootState, bundleId?: string) => bundleId,
  (bundles, bundleId) =>
    bundles.find(({ bundle }) => bundle.bundle_id === bundleId),
);

export const selectBundlePaymentPlanByPriceId = createSelector(
  selectBundlePaymentPlans,
  (_state: RootState, priceId?: string) => priceId,
  (bundles, priceId) =>
    bundles.find(({ bundle }) => bundle.price_id === priceId),
);

export const selectMyBundlesState = createSelector(
  fetchMyBundles.select(undefined),
  state => state,
);

export const selectMyBundles = createSelector(
  selectMyBundlesState,
  ({ data }) => data || [],
);

export const selectHasMyBundles = createSelector(
  selectMyBundles,
  bundles => bundles.length > 0,
);

export const selectMyCurrentBundle = createSelector(
  selectMyBundles,
  (bundles): ISubscriptionsItem | undefined => bundles[0],
);

export const selectMyCurrentBundlePlan = createSelector(
  (state: RootState) => state,
  selectMyCurrentBundle,
  (state, myBundle) =>
    selectBundlePaymentPlanByPriceId(state, myBundle?.productPriceId),
);

export const selectMyBundlesLoading = createSelector(
  selectMyBundlesState,
  ({ isLoading }) => isLoading,
);

export const selectMyBundlesFetching = createSelector(
  selectMyBundlesState,
  ({ isLoading, data }) => isLoading && typeof data === 'undefined',
);

export const selectMyBundlesLoaded = createSelector(
  selectMyBundlesState,
  ({ isUninitialized, isLoading }) => !isUninitialized && !isLoading,
);

export const selectIsMyBundleBySubscriptionId = createSelector(
  selectMyBundles,
  (_state: RootState, subsribtionId?: string) => subsribtionId,
  (bundles, subscriptionId) =>
    bundles.some(bundle => bundle.subscriptionId === subscriptionId),
);

export const selectBalanceState = createSelector(
  fetchBalance.select({}),
  state => state,
);

export const selectBalanceLoading = createSelector(
  selectBalanceState,
  ({ isLoading }) => isLoading,
);

export const selectIsBalanceUninitialized = createSelector(
  selectBalanceState,
  ({ isUninitialized }) => isUninitialized,
);

export const selectBalanceFetching = createSelector(
  selectBalanceState,
  ({ data, isLoading }) => isLoading && typeof data === 'undefined',
);

export const selectBalanceData = createSelector(
  selectBalanceState,
  ({ data = DEFAULT_BALANCE }) => data,
);

export const selectAnkrBalance = createSelector(
  selectBalanceData,
  ({ balance_ankr }) => balance_ankr,
);

export const selectTotalBalance = createSelector(
  selectBalanceData,
  ({ balance }) => balance,
);

export const selectUSDBalance = createSelector(
  selectBalanceData,
  ({ balance_usd }) => balance_usd,
);

export const selectVoucherBalance = createSelector(
  selectBalanceData,
  ({ balance_voucher }) => balance_voucher,
);

export const selectAnkrBalanceWithoutVouchers = createSelector(
  selectTotalBalance,
  selectVoucherBalance,
  (total, vouchers) =>
    new BigNumber(total)
      .minus(vouchers)
      .dividedToIntegerBy(ANKR_TO_CREDITS_RATE)
      .toString(),
);

export const selectBalanceLevel = createSelector(
  selectBalanceData,
  ({ balance_level }) => balance_level,
);

export const selectHasZeroBalance = createSelector(
  selectTotalBalance,
  balance => new BigNumber(balance).isZero() ?? true,
);

export const selectMySubscriptionsState = createSelector(
  fetchMySubscriptions.select({}),
  state => state,
);

export const selectMySubscriptionsLoading = createSelector(
  selectMySubscriptionsState,
  ({ isLoading }) => isLoading,
);

export const selectMySubscriptionsFetching = createSelector(
  selectMySubscriptionsState,
  ({ data, isLoading }) => isLoading && typeof data === 'undefined',
);

export const selectMySubscriptions = createSelector(
  selectMySubscriptionsState,
  ({ data }) => data?.items ?? [],
);

export const selectHasMySubscriptions = createSelector(
  selectMySubscriptions,
  subscriptions => subscriptions.length > 0,
);

export const selectAllMySubcriptionsAmount = createSelector(
  selectMySubscriptions,
  subscriptions =>
    subscriptions
      .reduce((amount, subscription) => amount.plus(subscription.amount), ZERO)
      .toString(),
);

export const selectMyBundlesStatusState = createSelector(
  fetchMyBundlesStatus.select(undefined),
  state => state,
);

export const selectMyBundlesStatus = createSelector(
  selectMyBundlesStatusState,
  ({ data = [] }) => data,
);

export const selectMyBundleStatusesByBundleId = createSelector(
  selectMyBundlesStatus,
  (_state: RootState, bundleId?: string) => bundleId,
  (statuses, bundleId) =>
    statuses.filter(status => status.bundleId === bundleId),
);

export const selectMyBundlesStatusLoading = createSelector(
  selectMyBundlesStatusState,
  ({ isLoading }) => isLoading,
);

export const selectMyBundlesStatusFetching = createSelector(
  selectMyBundlesStatusState,
  ({ data, isLoading }) => isLoading && typeof data === 'undefined',
);

export const selectMyCurrentBundleStatuses = createSelector(
  (state: RootState) => state,
  selectMyCurrentBundlePlan,
  (state, plan) =>
    selectMyBundleStatusesByBundleId(state, plan?.bundle.bundle_id),
);

export const selectMyCurrentBundleAllBlockChainsLimit = createSelector(
  selectMyCurrentBundlePlan,
  plan => {
    const limits = plan?.bundle.limits ?? [];
    const limit = limits.find(
      ({ blockchain_paths }) => blockchain_paths === ALL_BLOCKCHAINS_PATH,
    )?.limit;

    return Number(limit) || 0;
  },
);

export const selectMyCurrentBundleRequestsUsed = createSelector(
  selectMyCurrentBundleStatuses,
  selectMyCurrentBundleAllBlockChainsLimit,
  (statuses, limit) => {
    const counters = statuses
      .reduce<MyBundleStatusCounter[]>(
        (result, status) => [...result, ...status.counters],
        [],
      )
      .filter(
        ({ blockchainPaths }) => blockchainPaths === ALL_BLOCKCHAINS_PATH,
      );

    const requestsLeft = counters.reduce(
      (result, { count }) => result + Number(count) ?? 0,
      0,
    );

    const requestsLimit = limit * counters.length;

    return requestsLimit ? (requestsLimit - requestsLeft) / requestsLimit : 0;
  },
);

export const selectMyRecurringPayments = createSelector(
  selectMyBundles,
  selectMySubscriptions,
  (bundles, subscriptions) => [...bundles, ...subscriptions],
);

export const selectAllRecurringPaymentsAmount = createSelector(
  selectMyRecurringPayments,
  payments =>
    payments
      .reduce((amount, payment) => amount.plus(payment.amount), ZERO)
      .toString(),
);

export const selectHasRecurringPayments = createSelector(
  selectMyRecurringPayments,
  payments => payments.length > 0,
);

export const selectFullPAYGBalance = createSelector(
  selectBalanceLevel,
  selectAnkrBalance,
  selectTotalBalance,
  selectUSDBalance,
  selectVoucherBalance,
  selectAnkrBalanceWithoutVouchers,
  (
    balancePaygLevel,
    balancePaygAnkr,
    balancePaygTotal,
    balancePaygUsd,
    balancePaygVoucher,
    balancePaygWithoutVouchers,
    // eslint-disable-next-line max-params
  ) => {
    const balanceInRequests =
      Number(balancePaygTotal) / CREDITS_TO_REQUESTS_RATE;

    return {
      balanceLevel: balancePaygLevel,
      balanceAnkr: balancePaygAnkr,
      balanceTotal: balancePaygTotal,
      balanceApiCredits: balancePaygTotal,
      balanceUsd: balancePaygUsd,
      balanceVoucher: balancePaygVoucher,
      balanceWithoutVouchers: balancePaygWithoutVouchers,
      balanceInRequests: balanceInRequests.toString(),
    };
  },
);

export const selectIsFreeChargingModel = createSelector(
  selectBalanceLevel,
  balanceLevel =>
    balanceLevel === BalanceLevel.UNKNOWN ||
    balanceLevel === BalanceLevel.ZERO ||
    balanceLevel === BalanceLevel.CRITICAL ||
    balanceLevel === BalanceLevel.TOO_LOW ||
    balanceLevel === BalanceLevel.RED,
);

export const selectPAYGChargingModelData = createSelector(
  selectFullPAYGBalance,
  selectIsFreeChargingModel,
  (fullPAYGBalance, hasFreeChargingModel) => {
    /* PAYG/Free charging model data */
    if (hasFreeChargingModel) {
      const chargingModelFree: IFreeChargingModelData = {
        type: EChargingModel.Free,
        balance: fullPAYGBalance,
      };

      return chargingModelFree;
    }

    const chargingModelPayg: IPAYGChargingModelData = {
      type: EChargingModel.PAYG,
      balance: fullPAYGBalance,
    };

    return chargingModelPayg;
  },
);

const selectDealChargingModelData = createSelector(
  selectMyBundlesStatusState,
  selectBundlePaymentPlans,
  (myByndlesStatus, bundlePaymentPlans) => {
    /* Deal charging model data */
    if (myByndlesStatus.data) {
      const dealChargingModel = myByndlesStatus.data.find(bundle => {
        return bundle.counters.find(
          counter => counter.type === BundleType.COST,
        );
      });

      if (dealChargingModel?.counters) {
        return getDealChargingModelData({
          dealChargingModel,
          bundlePaymentPlans,
        });
      }
    }

    return undefined;
  },
);

export const selectPackageChargingModelData = createSelector(
  selectMyBundlesStatusState,
  selectBundlePaymentPlans,
  (myByndlesStatus, bundlePaymentPlans) => {
    /* Package charging model data (will be deprecated soon) */
    const packageChargingModel = myByndlesStatus?.data?.find(bundle => {
      const hasQtyCounter = bundle.counters.find(
        counter => counter.type === BundleType.QTY,
      );

      const hasCostCounter = bundle.counters.find(
        counter => counter.type === BundleType.COST,
      );

      return hasQtyCounter && !hasCostCounter;
    });

    if (packageChargingModel) {
      return getPackageChargingModelData({
        packageChargingModel,
        bundlePaymentPlans,
      });
    }

    return undefined;
  },
);

export const selectAccountChargingModels = createSelector(
  selectPAYGChargingModelData,
  selectDealChargingModelData,
  selectPackageChargingModelData,
  (
    paygChargingModelData,
    dealChargingModelData,
    packageChargingModelData,
  ): IChargingModelData[] => {
    const chargingModels: IChargingModelData[] = [paygChargingModelData];

    if (packageChargingModelData) {
      if (packageChargingModelData.isExpired) {
        chargingModels.push(packageChargingModelData);
      } else {
        // if user has actual package model, it should be shown first
        chargingModels.unshift(packageChargingModelData);
      }
    }

    if (dealChargingModelData) {
      const isExpired = new Date() > new Date(dealChargingModelData.expires);

      if (isExpired) {
        chargingModels.push(dealChargingModelData);
      } else {
        // if user has actual deal model, it should be shown first
        chargingModels.unshift(dealChargingModelData);
      }
    }

    return chargingModels;
  },
);

export const selectActiveChargingModel = createSelector(
  selectAccountChargingModels,
  chargingModels => chargingModels[0],
);
