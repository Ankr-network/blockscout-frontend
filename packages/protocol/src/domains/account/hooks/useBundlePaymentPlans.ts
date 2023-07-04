import {
  selectBundlePaymentPlans,
  selectBundlePaymentPlansLoading,
} from '../store/selectors';
import { useAppSelector } from 'store/useAppSelector';
import { useFetchBundlePaymentPlansQuery } from '../actions/bundles/fetchBundlePaymentPlans';

export const useBundlePaymentPlans = () => {
  useFetchBundlePaymentPlansQuery();

  const bundles = useAppSelector(selectBundlePaymentPlans);
  const loading = useAppSelector(selectBundlePaymentPlansLoading);

  return { bundles, loading };
};
