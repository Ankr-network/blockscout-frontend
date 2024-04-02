import { useCallback, useMemo } from 'react';

import { trackSignUpModalClose } from 'modules/analytics/mixpanel/trackSignUpModalClose';
import { ECurrency } from 'modules/billing/types';

import { ContentType, UpgradePlanDialogType } from '../types';
import { checkContactSalesPopup } from '../utils/checkContactSalesPopup';
import { useContentType } from './useContentType';
import { useDialogProps } from './useDialogProps';
import { useEnterpriseUpgradeHandler } from './useEnterpriseUpgradeHandler';
import { useFreeUpgradeHandler } from './useFreeUpgradeHandler';
import { usePlans } from './usePlans';
import { usePremiumUpgradeHandler } from './usePremiumUpgradeHandler';
import { useUpgradePlanHandler } from './useUpgradePlanHandler';

export interface UpgradePlanDialogStateParams {
  currency?: ECurrency;
  defaultState?: ContentType;
  onClose: () => void;
  type: UpgradePlanDialogType;
}

export const useUpgradePlanDialogState = ({
  currency,
  defaultState,
  onClose: handleClose,
  type,
}: UpgradePlanDialogStateParams) => {
  const {
    contentType,
    setDefault,
    setSignUp,
    setTopUp,
    setContactSales,
    setContactSalesSuccess: onSubmitContactForm,
  } = useContentType({ defaultState });
  const isSignUp = contentType === ContentType.SIGN_UP;

  const onUpgrade = useUpgradePlanHandler(type);

  const freeUpgradeHandler = useFreeUpgradeHandler(onUpgrade);

  const premiumUpgradeHandler = usePremiumUpgradeHandler({
    onUpgrade,
    setSignUp,
    setTopUp,
  });

  const enterpriseUpgradeHandler = useEnterpriseUpgradeHandler({
    onUpgrade,
    setContactSales,
  });

  const onClose = useCallback(() => {
    handleClose();
    setDefault();

    if (isSignUp) {
      trackSignUpModalClose();
    }
  }, [isSignUp, setDefault, handleClose]);

  const plans = usePlans(type);

  const dialogProps = useDialogProps({
    contentType,
    currency,
    enterpriseUpgradeHandler,
    freeUpgradeHandler,
    onClose,
    onSubmitContactForm,
    plans,
    premiumUpgradeHandler,
  });

  const isContactSalesPopup = useMemo(
    () => checkContactSalesPopup({ contentType, defaultState }),
    [contentType, defaultState],
  );

  return { dialogProps, isContactSalesPopup };
};
