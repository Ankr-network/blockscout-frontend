import { useCallback, useEffect, useState } from 'react';

import { useDialog } from 'modules/common/hooks/useDialog';
import { useNegativeBalanceTermsOfServices } from './useNegativeBalanceTermsOfServices';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';

export enum DialogView {
  default = 'default',
  failed = 'failed',
}

export const useNegativeBalanceTermsOfServicesDialog = () => {
  const { selectedGroupAddress } = useSelectedUserGroup();

  const { isOpened, onOpen, onClose } = useDialog();

  const {
    isAcceptLoading,
    shouldShowDialog,
    acceptNegativeBalanceTermsOfServices,
  } = useNegativeBalanceTermsOfServices();

  const [dialogView, setDialogView] = useState(DialogView.default);

  useEffect(() => {
    if (shouldShowDialog) {
      onOpen();
    } else {
      onClose();
    }
  }, [shouldShowDialog, onOpen, onClose]);

  const handleTryAgain = useCallback(async () => {
    const { error } = await acceptNegativeBalanceTermsOfServices(
      selectedGroupAddress,
    );

    if (error) {
      setDialogView(DialogView.failed);
    } else {
      onClose();
    }
  }, [
    selectedGroupAddress,
    setDialogView,
    acceptNegativeBalanceTermsOfServices,
    onClose,
  ]);

  const handleCloseFailedDialog = useCallback(() => {
    setDialogView(DialogView.default);
  }, []);

  return {
    dialogView,
    isAcceptLoading,
    isOpened,
    handleTryAgain,
    handleCloseFailedDialog,
  };
};
