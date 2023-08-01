import { useAuth } from 'domains/auth/hooks/useAuth';
import { useBundlePaymentPlans } from 'domains/account/hooks/useBundlePaymentPlans';
import { useMyBundles } from 'domains/account/hooks/useMyBundles';
import { useMyBundlesStatus } from 'domains/account/hooks/useMyBundlesStatus';
import { useMySubscriptions } from 'domains/account/hooks/useMySubscriptions';

export const useAccountDetails = () => {
  const { isLoggedIn, isOldPremium, loading: isConnecting } = useAuth();

  const { fetching: bundlePlansFetching } = useBundlePaymentPlans();
  const { fetching: myBundlesFetching } = useMyBundles();
  const { fetching: myBundlesStatusFetching } = useMyBundlesStatus();
  const { fetching: subscriptionsFetching } = useMySubscriptions();

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
