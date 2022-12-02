import { useCallback, useState } from 'react';

import {
  sessionServiceInstance,
  SessionServiceKeys,
} from 'modules/common/services';

interface IUseSuspendModal {
  isActive: boolean;
  handleClose: () => void;
}

export const useSuspendModal = (): IUseSuspendModal => {
  const isBannerHidden = sessionServiceInstance.getItem(
    SessionServiceKeys.IS_SUSPEND_MODAL_HIDDEN,
  );

  const [isActive, setActive] = useState(!isBannerHidden);

  const handleClose = useCallback(() => {
    sessionServiceInstance.setItem(
      SessionServiceKeys.IS_SUSPEND_MODAL_HIDDEN,
      true,
    );
    setActive(false);
  }, []);

  return {
    isActive,
    handleClose,
  };
};
