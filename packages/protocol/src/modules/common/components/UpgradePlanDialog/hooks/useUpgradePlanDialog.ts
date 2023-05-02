import { useCallback, useEffect } from 'react';

import { UpgradePlanDialogType } from '../types';
import { trackUpgradePlanModalClose } from 'modules/analytics/mixpanel/trackUpgradePlanModalClose';
import { trackUpgradePlanModalOpen } from 'modules/analytics/mixpanel/trackUpgradePlanModalOpen';
import { useDialog } from 'modules/common/hooks/useDialog';

export interface UpgradePlanDialogHookParams {
  isOpened?: boolean;
  type?: UpgradePlanDialogType;
}

export const useUpgradePlanDialog = ({
  isOpened: isInitallyOpened = false,
  type = UpgradePlanDialogType.Default,
}: UpgradePlanDialogHookParams = {}) => {
  const {
    isOpened,
    onOpen: handleOpen,
    onClose: handleClose,
  } = useDialog(isInitallyOpened);

  const onOpen = handleOpen;

  const onClose = useCallback(() => {
    handleClose();

    trackUpgradePlanModalClose(type);
  }, [handleClose, type]);

  useEffect(() => {
    if (!isOpened && isInitallyOpened) {
      onOpen();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInitallyOpened]);

  useEffect(() => {
    if (isOpened) {
      trackUpgradePlanModalOpen(type);
    }
    // We must send the mixpanel event only if isOpened variable has changed
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpened]);

  return { isOpened, onClose, onOpen };
};
