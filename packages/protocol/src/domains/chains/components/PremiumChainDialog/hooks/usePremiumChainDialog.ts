import { useCallback } from 'react';

import { Item } from '../types';
import { useContentType } from './useContentType';
import { useDialogProps } from './useDialogProps';
import { usePremiumUpgradeHandler } from './usePremiumUpgradeHandler';

export interface PremiumChainDialogHookParams {
  items: Item[];
  onClose: () => void;
  onTrack?: () => void;
}

export const usePremiumChainDialog = ({
  items,
  onClose: handleClose,
  onTrack,
}: PremiumChainDialogHookParams) => {
  const { contentType, setDefault, setSignUp, setTopUp } = useContentType();

  const premiumUpgradeHandler = usePremiumUpgradeHandler({
    setSignUp,
    setTopUp,
    onTrack,
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
  });
};
