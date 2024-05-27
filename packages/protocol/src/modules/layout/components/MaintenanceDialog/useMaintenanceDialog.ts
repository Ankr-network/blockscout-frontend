import { useCallback, useEffect } from 'react';

import { useDialog } from 'modules/common/hooks/useDialog';
import {
  hasMaintenanceDialogBeenShown,
  setMaintenanceDialogAsShown,
} from 'modules/common/utils/maintenanceUtils';
import { useAuth } from 'domains/auth/hooks/useAuth';

export const useMaintenanceDialog = () => {
  const { isLoggedIn } = useAuth();

  const {
    isOpened: isMaintenanceDialogOpened,
    onClose: handleMaintenanceDialogClose,
    onOpen: handleMaintenanceDialogOpen,
  } = useDialog();

  const hasMaintenaceDialogFlag = hasMaintenanceDialogBeenShown();

  useEffect(() => {
    const shouldOpenMaintenanceDialog = isLoggedIn && !hasMaintenaceDialogFlag;

    if (shouldOpenMaintenanceDialog) {
      handleMaintenanceDialogOpen();
    }
  }, [isLoggedIn, hasMaintenaceDialogFlag, handleMaintenanceDialogOpen]);

  const handleClose = useCallback(() => {
    setMaintenanceDialogAsShown();
    handleMaintenanceDialogClose();
  }, [handleMaintenanceDialogClose]);

  return {
    isOpened: isMaintenanceDialogOpened,
    onClose: handleClose,
  };
};
