import { useAuth } from 'domains/auth/hooks/useAuth';
import { useAppSelector } from 'store/useAppSelector';
import { selectActiveChargingModel } from 'domains/account/store/selectors';
import { API_CREDITS_BALANCE_FIELD_NAME } from 'domains/account/screens/BillingPage/const';
import { useBundlePaymentPlans } from 'domains/account/hooks/useBundlePaymentPlans';
import { useMyBundles } from 'domains/account/hooks/useMyBundles';
import { useMyBundlesStatus } from 'domains/account/hooks/useMyBundlesStatus';

export const useBalanceButton = () => {
  const { hasStatusTransition, loading: isConnecting, isLoggedIn } = useAuth();
  const { fetching: bundlePlansFetching } = useBundlePaymentPlans();
  const { fetching: myBundlesFetching } = useMyBundles();
  const { fetching: myBundlesStatusFetching } = useMyBundlesStatus();

  const currentChargingModel = useAppSelector(selectActiveChargingModel);

  const { balance: balancesData } = currentChargingModel;

  const shouldShowApiCreditsBalance =
    API_CREDITS_BALANCE_FIELD_NAME in balancesData;

  return {
    balance: shouldShowApiCreditsBalance
      ? balancesData.balanceApiCredits
      : balancesData.balanceInRequests,
    hasStatusTransition,
    isApiCreditsBalance: shouldShowApiCreditsBalance,
    isLoading:
      bundlePlansFetching ||
      myBundlesFetching ||
      myBundlesStatusFetching ||
      isConnecting,
    isLoggedIn,
  };
};
