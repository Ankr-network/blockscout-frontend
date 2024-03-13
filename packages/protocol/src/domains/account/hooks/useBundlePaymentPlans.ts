// @ts-nocheck
import { skipToken } from '@reduxjs/toolkit/dist/query';

import { useAppSelector } from 'store/useAppSelector';

import {
  selectBundlePaymentPlans,
  selectBundlePaymentPlansFetching,
  selectBundlePaymentPlansLoading,
  selectFirstBundlePaymentPlan,
} from '../store/selectors';
import { useFetchBundlePaymentPlansQuery } from '../actions/bundles/fetchBundlePaymentPlans';

export interface BundlePaymentPlansParams {
  skipFetching?: boolean;
}

export const useBundlePaymentPlans = ({
  skipFetching = false,
}: BundlePaymentPlansParams | void = {}) => {
  useFetchBundlePaymentPlansQuery(skipFetching ? skipToken : undefined);

  const bundle500 = useAppSelector(selectFirstBundlePaymentPlan);
  const bundles = useAppSelector(selectBundlePaymentPlans);
  const fetching = useAppSelector(selectBundlePaymentPlansFetching);
  const loading = useAppSelector(selectBundlePaymentPlansLoading);

  return { bundle500, bundles, fetching, loading };
};
