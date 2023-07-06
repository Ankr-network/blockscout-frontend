import { skipToken } from '@reduxjs/toolkit/dist/query';

import {
  selectBundlePaymentPlans,
  selectBundlePaymentPlansLoading,
} from '../store/selectors';
import { useAppSelector } from 'store/useAppSelector';
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
