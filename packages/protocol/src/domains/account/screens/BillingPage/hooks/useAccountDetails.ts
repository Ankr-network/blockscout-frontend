import { useAuth } from 'domains/auth/hooks/useAuth';
import { useAppSelector } from 'store/useAppSelector';
import {
  selectBundlePaymentPlansInitLoading,
  selectMyBundlesInitLoading,
  selectMyBundlesStatusInitLoading,
  selectMySubscriptionsInitLoading,
} from 'domains/account/store/selectors';

export const useAccountDetails = () => {
  const { isLoggedIn, isOldPremium, loading: isConnecting } = useAuth();

  const bundlePlansFetching = useAppSelector(
    selectBundlePaymentPlansInitLoading,
  );
  const myBundlesFetching = useAppSelector(selectMyBundlesInitLoading);
  const myBundlesStatusFetching = useAppSelector(
    selectMyBundlesStatusInitLoading,
  );
  const subscriptionsFetching = useAppSelector(
    selectMySubscriptionsInitLoading,
  );

  const loading =
    isConnecting ||
    myBundlesFetching ||
    myBundlesStatusFetching ||
    bundlePlansFetching ||
    subscriptionsFetching;

  // We only show the expense chart for registered users
  // but not for old premium users who registered before PAYG model
  const hasExpenseChart = isLoggedIn && !isOldPremium;

  return { hasExpenseChart, loading };
};
