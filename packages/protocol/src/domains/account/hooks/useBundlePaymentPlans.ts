import { skipToken } from '@reduxjs/toolkit/dist/query';

import { useAppSelector } from 'store/useAppSelector';

import {
  selectBundlePaymentPlans,
  selectBundlePaymentPlansLoading,
} from '../store/selectors';
import { useFetchBundlePaymentPlansQuery } from '../actions/bundles/fetchBundlePaymentPlans';

export interface BundlePaymentPlansParams {
  skipFetching?: boolean;
}

export const useBundlePaymentPlans = ({
  skipFetching = false,
}: BundlePaymentPlansParams | void = {}) => {
  useFetchBundlePaymentPlansQuery(skipFetching ? skipToken : undefined);

  const bundles = useAppSelector(selectBundlePaymentPlans);
  const loading = useAppSelector(selectBundlePaymentPlansLoading);

  return { bundles, loading };
};
