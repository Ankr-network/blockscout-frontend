import { useCallback } from 'react';

export interface IUseCloseDialogHandlerProps {
  handleRejectAllowance: () => void;
  handleResetAllowance: () => void;
  isOngoingPaymentError: boolean;
  isOngoingPaymentPending: boolean;
  onCryptoPaymentDepositDialogClose: () => void;
}

export const useCloseDialogHandler = ({
  handleRejectAllowance,
  handleResetAllowance,
  isOngoingPaymentError,
  isOngoingPaymentPending,
  onCryptoPaymentDepositDialogClose,
}: IUseCloseDialogHandlerProps) => {
  const onClose = useCallback(() => {
    if (isOngoingPaymentError) {
      handleRejectAllowance();
    } else if (!isOngoingPaymentPending) {
      handleResetAllowance();
    }

    onCryptoPaymentDepositDialogClose();
  }, [
    handleRejectAllowance,
    handleResetAllowance,
    isOngoingPaymentError,
    isOngoingPaymentPending,
    onCryptoPaymentDepositDialogClose,
  ]);

  return { onClose };
};
