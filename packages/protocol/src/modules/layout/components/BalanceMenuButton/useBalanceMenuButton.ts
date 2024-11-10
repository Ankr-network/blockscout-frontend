import { API_CREDITS_BALANCE_FIELD_NAME } from 'domains/account/screens/BillingPage/const';
import {
  selectActiveChargingModel,
  selectBundlePaymentPlansInitLoading,
  selectMyBundlesInitLoading,
  selectMyBundlesStatusInitLoading,
  selectMySubscriptionsInitLoading,
} from 'domains/account/store/selectors';
import { useAppSelector } from 'store/useAppSelector';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useMenu } from 'modules/common/hooks/useMenu';

export const useBalanceMenuButton = () => {
  const { hasStatusTransition, isLoggedIn, loading: isConnecting } = useAuth();

  const isMyBundlesStatusLoading = useAppSelector(
    selectMyBundlesStatusInitLoading,
  );
  const isBundlePaymentPlansLoading = useAppSelector(
    selectBundlePaymentPlansInitLoading,
  );
  const isMyBundlesLoading = useAppSelector(selectMyBundlesInitLoading);
  const isMySubscriptionsLoading = useAppSelector(
    selectMySubscriptionsInitLoading,
  );

  const currentChargingModel = useAppSelector(selectActiveChargingModel);

  const {
    anchorEl,
    handleClose,
    handleOpen,
    open: isBalanceMenuOpened,
  } = useMenu();

  const { balance: balancesData } = currentChargingModel;

  const shouldShowApiCreditsBalance =
    API_CREDITS_BALANCE_FIELD_NAME in balancesData;

  return {
    balance: shouldShowApiCreditsBalance
      ? balancesData.balanceApiCredits
      : balancesData.balanceInRequests,
    currentChargingModel,
    usdBalance: balancesData.balanceUsd,
    balanceInRequests: balancesData.balanceInRequests,
    creditBalance: shouldShowApiCreditsBalance
      ? balancesData.balanceApiCredits
      : undefined,
    hasStatusTransition,
    isApiCreditsBalance: shouldShowApiCreditsBalance,
    isLoading:
      isConnecting ||
      isMyBundlesStatusLoading ||
      isBundlePaymentPlansLoading ||
      isMyBundlesLoading ||
      isMySubscriptionsLoading,
    isLoggedIn,
    anchorEl,
    handleClose,
    handleOpen,
    isBalanceMenuOpened,
  };
};
