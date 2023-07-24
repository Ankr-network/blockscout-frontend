import { BundlePaymentPlan } from 'multirpc-sdk';
import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'store';

import { fetchBundlePaymentPlans } from '../actions/bundles/fetchBundlePaymentPlans';
import { fetchMyBundles } from '../actions/bundles/fetchMyBundles';

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

export const selectBundlePaymentByPriceId = createSelector(
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

export const selectMyBundlesLoading = createSelector(
  selectMyBundlesState,
  ({ isLoading }) => isLoading,
);

export const selectMyBundlesIsLoaded = createSelector(
  selectMyBundlesState,
  ({ isUninitialized, isLoading }) => !isUninitialized && !isLoading,
);

export const selectIsMyBundleBySubscriptionId = createSelector(
  selectMyBundles,
  (_state: RootState, subsribtionId?: string) => subsribtionId,
  (bundles, subscriptionId) =>
    bundles.some(bundle => bundle.subscriptionId === subscriptionId),
);
