import { useCallback } from 'react';
import { t } from '@ankr.com/common';

import { useDialog } from 'modules/common/hooks/useDialog';

// TODO: add logic in scope of MRPC-4445
export const useConfirmCancelDialog = (defaultState = false) => {
  const { isOpened, onOpen, onClose } = useDialog(defaultState);
  const nextPaymentDate = '1709999931231'; // TODO: get date from state
  const dialogTitle = t('account.periodic-payments.cancel.deal-title');
  const dialogDescription = t(
    'account.periodic-payments.cancel.deal-description',
    {
      date: nextPaymentDate,
    },
  );

  const handleConfirm = useCallback(async () => {
    // TODO: https://ankrnetwork.atlassian.net/browse/MRPC-4445
  }, []);

  return {
    isOpened,
    onOpen,
    onClose,
    dialogTitle,
    dialogDescription,
    handleConfirm,
    isLoading: false, // TODO: https://ankrnetwork.atlassian.net/browse/MRPC-4445
  };
};
