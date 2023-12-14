import BigNumber from 'bignumber.js';
import {
  BundlePaymentPlan,
  ISubscriptionsItem,
  MyBundleStatusCounter,
} from 'multirpc-sdk';
import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'store';
import { ZERO } from 'modules/common/constants/const';

import {
  ALL_BLOCKCHAINS_PATH,
  ANKR_TO_CREDITS_RATE,
  DEFAULT_BALANCE,
} from './const';
import { fetchBalance } from '../actions/balance/fetchBalance';
import { fetchBundlePaymentPlans } from '../actions/bundles/fetchBundlePaymentPlans';
import { fetchMyBundles } from '../actions/bundles/fetchMyBundles';
import { fetchMyBundlesStatus } from '../actions/bundles/fetchMyBundlesStatus';
import { fetchMySubscriptions } from '../actions/subscriptions/fetchMySubscriptions';

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
