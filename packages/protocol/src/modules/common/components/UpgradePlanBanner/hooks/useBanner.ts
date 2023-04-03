import { useCallback } from 'react';

import { useDialog } from 'modules/common/hooks/useDialog';
import { trackBannerRegister } from 'modules/analytics/mixpanel/trackBannerRegister';
import { BannerFreeToRegisterType } from 'modules/analytics/mixpanel/const';
import { useIsBannerV2 } from './useIsBannerV2';

export const useBanner = () => {
  const { isBannerV2 } = useIsBannerV2();
  const { isOpened, onOpen, onClose } = useDialog(isBannerV2);

  const handleOpen = useCallback(() => {
    onOpen();
    trackBannerRegister(BannerFreeToRegisterType.open);
  }, [onOpen]);

  const handleClose = useCallback(() => {
    onClose();
    trackBannerRegister(BannerFreeToRegisterType.close);
  }, [onClose]);

  const handleUpgrade = useCallback(
    () => trackBannerRegister(BannerFreeToRegisterType.register),
    [],
  );

  return {
    isBannerV2,
    isOpened,
    handleOpen,
    handleClose,
    handleUpgrade,
  };
};
