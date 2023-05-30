import { useCallback, useEffect } from 'react';

import { useDialog } from 'modules/common/hooks/useDialog';
import { useNegativeBalanceTermsOfServices } from './useNegativeBalanceTermsOfServices';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';

export const useNegativeBalanceTermsOfServicesDialog = () => {
  const { selectedGroupAddress } = useSelectedUserGroup();

  const { isOpened, onOpen, onClose } = useDialog();

  const { shouldShowDialog, acceptNegativeBalanceTermsOfServices } =
    useNegativeBalanceTermsOfServices();

  useEffect(() => {
    if (shouldShowDialog) {
      onOpen();
    } else {
      onClose();
    }
  }, [shouldShowDialog, onOpen, onClose]);

  const handleClose = useCallback(async () => {
    const { error } = await acceptNegativeBalanceTermsOfServices(
      selectedGroupAddress || undefined,
    );
    if (!error) {
      onClose();
    }
  }, [selectedGroupAddress, acceptNegativeBalanceTermsOfServices, onClose]);

  return {
    isOpened,
    handleClose,
  };
};
