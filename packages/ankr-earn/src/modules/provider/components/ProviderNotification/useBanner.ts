import { useCallback, useState } from 'react';

import {
  sessionServiceInstance,
  SessionServiceKeys,
} from 'modules/common/services';

interface IUseBanner {
  isActive: boolean;
  handleClose: () => void;
}

export const useBanner = (): IUseBanner => {
  const isBannerHidden = sessionServiceInstance.getItem(
    SessionServiceKeys.IS_PROVIDER_BANNER_HIDDEN,
  );

  const [isActive, setActive] = useState(!isBannerHidden);

  const handleClose = useCallback(() => {
    sessionServiceInstance.setItem(
      SessionServiceKeys.IS_PROVIDER_BANNER_HIDDEN,
      true,
    );
    setActive(false);
  }, []);

  return {
    isActive,
    handleClose,
  };
};
