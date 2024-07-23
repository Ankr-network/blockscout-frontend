import { useCallback, useEffect } from 'react';

import { trackUpgradePlanModalClose } from 'modules/analytics/mixpanel/trackUpgradePlanModalClose';
import { trackUpgradePlanModalOpen } from 'modules/analytics/mixpanel/trackUpgradePlanModalOpen';
import { useDialog } from 'modules/common/hooks/useDialog';

export interface UpgradePlanDialogHookParams {
  isOpened?: boolean;
}

export const useUpgradePlanDialog = ({
  isOpened: isInitallyOpened = false,
}: UpgradePlanDialogHookParams = {}) => {
  const {
    isOpened,
    onClose: handleClose,
    onOpen: handleOpen,
  } = useDialog(isInitallyOpened);

  const onOpen = handleOpen;

  const onClose = useCallback(() => {
    handleClose();

    trackUpgradePlanModalClose();
  }, [handleClose]);

  useEffect(() => {
    if (!isOpened && isInitallyOpened) {
      onOpen();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInitallyOpened]);

  useEffect(() => {
    if (isOpened) {
      trackUpgradePlanModalOpen();
    }
    // We must send the mixpanel event only if isOpened variable has changed
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpened]);

  return { isOpened, onClose, onOpen };
};
