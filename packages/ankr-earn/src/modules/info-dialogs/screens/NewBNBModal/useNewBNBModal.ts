import { useCallback, useState } from 'react';

import {
  sessionServiceInstance,
  SessionServiceKeys,
} from 'modules/common/services';

interface INewBNBModal {
  isActive: boolean;
  handleClose: () => void;
}

export const useNewBNBModal = (): INewBNBModal => {
  const isBannerHidden = sessionServiceInstance.getItem(
    SessionServiceKeys.IS_NEW_BNB_MODAL_HIDDEN,
  );

  const [isActive, setActive] = useState(!isBannerHidden);

  const handleClose = useCallback(() => {
    sessionServiceInstance.setItem(
      SessionServiceKeys.IS_NEW_BNB_MODAL_HIDDEN,
      true,
    );
    setActive(false);
  }, []);

  return {
    isActive,
    handleClose,
  };
};
