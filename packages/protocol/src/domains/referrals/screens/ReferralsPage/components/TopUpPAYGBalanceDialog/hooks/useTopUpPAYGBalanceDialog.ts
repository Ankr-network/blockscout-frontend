import { useCallback, useMemo } from 'react';

import { useDialog } from 'modules/common/hooks/useDialog';

import { ITopUpBalanceDialogProps } from '../TopUpPAYGBalanceDialog';
import { useAmountInput } from '../components/AmountInput';
import { useButtons } from '../components/Buttons';
import { usePAYGAccountCard } from '../components/PAYGAccountCard';
import { useNotifications } from './useNotifications';

export const useTopUpPAYGBalanceDialog = () => {
  const {
    isOpened,
    onClose: handleClose,
    onOpen: handleTopUpPAYGBalanceDialogOpen,
  } = useDialog();

  const {
    amount,
    amountInputProps,
    reset: resetAmountInput,
    setError,
    validateAmount,
  } = useAmountInput();
  const { paygAccountCardProps } = usePAYGAccountCard();
  const { showFailureAlert, showSuccessAlert } = useNotifications({ amount });

  const onClose = useCallback(() => {
    resetAmountInput();
    handleClose();
  }, [handleClose, resetAmountInput]);

  const { buttonsProps } = useButtons({
    amount,
    handleCloseDialog: onClose,
    onError: showFailureAlert,
    onSuccess: showSuccessAlert,
    setError,
    validateAmount,
  });

  const topUpPAYGBalanceDialogProps = useMemo(
    (): ITopUpBalanceDialogProps => ({
      amountInputProps,
      buttonsProps,
      onClose,
      open: isOpened,
      paygAccountCardProps,
    }),
    [amountInputProps, buttonsProps, isOpened, onClose, paygAccountCardProps],
  );

  return { handleTopUpPAYGBalanceDialogOpen, topUpPAYGBalanceDialogProps };
};
