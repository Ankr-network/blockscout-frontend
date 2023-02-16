import { useCallback } from 'react';

import { Item } from '../types';
import { useContentType } from './useContentType';
import { useDialogProps } from './useDialogProps';
import { usePremiumUpgradeHandler } from './usePremiumUpgradeHandler.ts';

export interface PremiumChainDialogHookParams {
  items: Item[];
  isV2?: boolean;
  onClose: () => void;
  onTrack?: () => void;
}

export const usePremiumChainDialog = ({
  items,
  isV2,
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
    isV2,
    items,
    onClose,
    onTrack,
    premiumUpgradeHandler,
  });
};
