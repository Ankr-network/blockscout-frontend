import { useAuth } from 'domains/auth/hooks/useAuth';
import { useAppSelector } from 'store/useAppSelector';
import {
  selectActiveChargingModel,
  selectBundlePaymentPlansLoading,
  selectMyBundlesLoading,
  selectMyBundlesStatusLoading,
} from 'domains/account/store/selectors';
import { API_CREDITS_BALANCE_FIELD_NAME } from 'domains/account/screens/BillingPage/const';
import { useMenu } from 'modules/common/hooks/useMenu';

export const useBalanceMenuButton = () => {
  const { hasStatusTransition, loading: isConnecting, isLoggedIn } = useAuth();

  const isMyBundlesStatusLoading = useAppSelector(selectMyBundlesStatusLoading);
  const isBundlePaymentPlansLoading = useAppSelector(
    selectBundlePaymentPlansLoading,
  );
  const isMyBundlesLoading = useAppSelector(selectMyBundlesLoading);

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
      isMyBundlesStatusLoading ||
      isBundlePaymentPlansLoading ||
      isMyBundlesLoading ||
      isConnecting,
    isLoggedIn,
    anchorEl,
    handleClose,
    handleOpen,
    isBalanceMenuOpened,
  };
};
