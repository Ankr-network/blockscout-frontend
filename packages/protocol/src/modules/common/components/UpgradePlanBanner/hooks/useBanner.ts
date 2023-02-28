import { useCallback } from 'react';
import { useDialog } from 'modules/common/hooks/useDialog';
import { trackBannerRegister } from 'modules/analytics/mixpanel/utils/trackBannerRegister';
import { BannerFreeToRegisterType } from 'modules/analytics/mixpanel/types';
import { useIsBannerV2 } from './useIsBannerV2';

export const useBanner = () => {
  const { isBannerV2 } = useIsBannerV2();
  const { isOpened, onOpen, onClose } = useDialog(isBannerV2);

  const handleOpen = useCallback(() => {
    onOpen();
    trackBannerRegister({ type: BannerFreeToRegisterType.open });
  }, [onOpen]);

  const handleClose = useCallback(() => {
    onClose();
    trackBannerRegister({ type: BannerFreeToRegisterType.close });
  }, [onClose]);

  const handleUpgrade = useCallback(
    () => trackBannerRegister({ type: BannerFreeToRegisterType.register }),
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
