import { useCallback } from 'react';

import { ContentType, Item } from '../types';
import { trackSignUpModalClose } from 'modules/analytics/mixpanel/trackSignUpModalClose';
import { useContentType } from './useContentType';
import { useDialogProps } from './useDialogProps';
import { usePremiumUpgradeHandler } from './usePremiumUpgradeHandler';
import { useContactFormHandler } from './useContactFormHandler';

export interface PremiumChainDialogHookParams {
  defaultState?: ContentType;
  items: Item[];
  onClose: () => void;
  onUpgrade?: () => void;
}

export const usePremiumChainDialog = ({
  items,
  onClose: handleClose,
  onUpgrade,
  defaultState,
}: PremiumChainDialogHookParams) => {
  const {
    contentType,
    setDefault,
    setSignUp,
    setTopUp,
    setContactSales,
    setContactSalesSuccess,
  } = useContentType({ defaultState });
  const isSignUp = contentType === ContentType.SIGN_UP;

  const premiumUpgradeHandler = usePremiumUpgradeHandler({
    setSignUp,
    setTopUp,
    onUpgrade,
  });

  const contactFormHandler = useContactFormHandler({
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

  return useDialogProps({
    contentType,
    items,
    onClose,
    onUpgrade,
    premiumUpgradeHandler,
    contactFormHandler,
    onSubmitContactForm: setContactSalesSuccess,
  });
};
