import { useCallback } from 'react';

import { ContentType, Item } from '../types';
import { useContentType } from './useContentType';
import { useDialogProps } from './useDialogProps';
import { usePremiumUpgradeHandler } from './usePremiumUpgradeHandler';
import { useContactFormHandler } from './useContactFormHandler';

export interface PremiumChainDialogHookParams {
  items: Item[];
  onClose: () => void;
  onTrack?: () => void;
  defaultState?: ContentType;
}

export const usePremiumChainDialog = ({
  items,
  onClose: handleClose,
  onTrack,
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

  const premiumUpgradeHandler = usePremiumUpgradeHandler({
    setSignUp,
    setTopUp,
    onTrack,
  });

  const contactFormHandler = useContactFormHandler({
    onTrack,
    setContactSales,
  });

  const onClose = useCallback(() => {
    handleClose();
    setDefault();
  }, [setDefault, handleClose]);

  return useDialogProps({
    contentType,
    items,
    onClose,
    onTrack,
    premiumUpgradeHandler,
    contactFormHandler,
    onSubmitContactForm: setContactSalesSuccess,
  });
};
