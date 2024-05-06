import { skipToken } from '@reduxjs/toolkit/dist/query';
import { SubscriptionOptions } from '@reduxjs/toolkit/dist/query/core/apiState';

import { useAppSelector } from 'store/useAppSelector';
import {
  selectBundlePaymentPlans,
  selectBundlePaymentPlansFetching,
  selectBundlePaymentPlansInitLoading,
  selectBundlePaymentPlansLoading,
  selectDealPaymentPlans,
  selectFirstBundlePaymentPlan,
  selectFirstDealPaymentPlan,
} from 'domains/account/store/selectors';

import { useFetchBundlePaymentPlansQuery } from '../actions/bundles/fetchBundlePaymentPlans';

export interface BundlePaymentPlansParams {
  skipFetching?: boolean;
}

const defaultOptions: SubscriptionOptions = {
  pollingInterval: 30_000,
};

export const useBundlePaymentPlans = ({
  skipFetching = false,
}: BundlePaymentPlansParams | void = {}) => {
  useFetchBundlePaymentPlansQuery(
    skipFetching ? skipToken : undefined,
    defaultOptions,
  );

  const bundle500 = useAppSelector(selectFirstBundlePaymentPlan);
  const bundles = useAppSelector(selectBundlePaymentPlans);
  const dealBundles = useAppSelector(selectDealPaymentPlans);
  const deal500 = useAppSelector(selectFirstDealPaymentPlan);
  const fetching = useAppSelector(selectBundlePaymentPlansFetching);
  const loading = useAppSelector(selectBundlePaymentPlansLoading);
  const isLoadingInitially = useAppSelector(
    selectBundlePaymentPlansInitLoading,
  );

  return {
    bundle500,
    bundles,
    dealBundles,
    deal500,
    fetching,
    loading,
    isLoadingInitially,
  };
};
