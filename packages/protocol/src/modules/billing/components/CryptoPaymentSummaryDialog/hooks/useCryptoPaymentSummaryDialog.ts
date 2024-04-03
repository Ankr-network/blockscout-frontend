import { Web3Address } from 'multirpc-sdk';
import { useCallback, useMemo } from 'react';

import { useConnectAccountHandler } from 'modules/billing/hooks/useConnectAccountHandler';
import { useConnectedAddress } from 'modules/billing/hooks/useConnectedAddress';
import { useDialog } from 'modules/common/hooks/useDialog';

import { ICryptoPaymentSummaryDialogProps } from '../CryptoPaymentSummaryDialog';
import { IUseCryptoPaymentSummaryDialogProps } from '../types';

interface IUseCryptoPaymentSummaryDialog
  extends IUseCryptoPaymentSummaryDialogProps {
  onConnectAccountSuccess: (connectedAddress: Web3Address) => void;
  onClose?: () => void;
  onConfirm: () => Promise<void>;
}

export const useCryptoPaymentSummaryDialog = ({
  amount,
  approvalFeeDetails,
  currency,
  depositFeeDetails,
  network,
  onClose: handleCloseExternal,
  onConfirm,
  onConnectAccountSuccess,
  totalAmount,
}: IUseCryptoPaymentSummaryDialog) => {
  const {
    isOpened,
    onClose: handleClose,
    onOpen: handleCryptoPaymentSummaryDialogOpen,
  } = useDialog();

  const { connectedAddress, walletIcon } = useConnectedAddress();

  const { isConnecting, handleConnectAccount } = useConnectAccountHandler({
    onSuccess: onConnectAccountSuccess,
  });

  const onAnotherAddressButtonClick = handleConnectAccount;

  const onClose = useCallback(() => {
    handleClose();
    handleCloseExternal?.();
  }, [handleClose, handleCloseExternal]);

  const onCancelButtonClick = onClose;

  const onConfirmButtonClick = useCallback(async () => {
    onClose();

    await onConfirm();
  }, [onClose, onConfirm]);

  const cryptoPaymentSummaryDialogProps =
    useMemo<ICryptoPaymentSummaryDialogProps>(() => {
      return {
        amount,
        approvalFeeDetails,
        connectedAddress,
        currency,
        depositFeeDetails,
        isConnecting,
        network,
        onAnotherAddressButtonClick,
        onCancelButtonClick,
        onClose,
        onConfirmButtonClick,
        onConnectButtonClick: handleConnectAccount,
        open: isOpened,
        totalAmount,
        walletIcon,
      };
    }, [
      amount,
      approvalFeeDetails,
      connectedAddress,
      currency,
      depositFeeDetails,
      handleConnectAccount,
      isConnecting,
      isOpened,
      network,
      onAnotherAddressButtonClick,
      onCancelButtonClick,
      onClose,
      onConfirmButtonClick,
      totalAmount,
      walletIcon,
    ]);

  return {
    cryptoPaymentSummaryDialogProps,
    handleCryptoPaymentSummaryDialogOpen,
  };
};
