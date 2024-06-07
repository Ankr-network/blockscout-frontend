import { useCallback, useMemo } from 'react';

import { useDialog } from 'modules/common/hooks/useDialog';
import { useWalletAddress } from 'domains/wallet/hooks/useWalletAddress';
import { useWalletMeta } from 'domains/wallet/hooks/useWalletMeta';
import { useWeb3Service } from 'domains/auth/hooks/useWeb3Service';

import { ICryptoPaymentSummaryDialogCommonProps } from '../types';
import { ICryptoPaymentSummaryDialogProps } from '../CryptoPaymentSummaryDialog';

export interface IUseCryptoPaymentSummaryDialogProps
  extends ICryptoPaymentSummaryDialogCommonProps {
  handleConnectWalletAccount: () => void;
  isConfirming: boolean;
  onClose?: () => void;
  onConfirmButtonClick: () => void;
  onOpen?: () => Promise<void>;
  setIsAccountChangedOnDepositStep: (isChanged: boolean) => void;
}

export const useCryptoPaymentSummaryDialog = ({
  allowanceFeeDetails,
  amount,
  currency,
  depositFeeDetails,
  handleConnectWalletAccount,
  handleNetworkChange,
  hasEnoughTokenBalance,
  isAccountChangedOnDepositStep,
  isConfirming,
  isLoading,
  isWalletAccountConnecting,
  network,
  networks,
  onClose: handleCloseExternal,
  onConfirmButtonClick: handleConfirmButtonClick,
  onOpen: onOpenExternal,
  oneTimeAmountProps,
  setIsAccountChangedOnDepositStep,
  totalAmount,
}: IUseCryptoPaymentSummaryDialogProps) => {
  const { isOpened, onClose: handleClose, onOpen } = useDialog();

  const { handleCreateWeb3Service } = useWeb3Service();

  const handleCryptoPaymentSummaryDialogOpen = useCallback(async () => {
    await handleCreateWeb3Service();

    await onOpenExternal?.();

    onOpen();
  }, [handleCreateWeb3Service, onOpen, onOpenExternal]);

  const { walletAddress: connectedAddress } = useWalletAddress();
  const { walletMeta } = useWalletMeta();

  const onClose = useCallback(() => {
    handleClose();

    handleCloseExternal?.();
    setIsAccountChangedOnDepositStep(false);
  }, [handleClose, handleCloseExternal, setIsAccountChangedOnDepositStep]);

  const onCancelButtonClick = onClose;

  const onConfirmButtonClick = useCallback(() => {
    handleClose();
    setIsAccountChangedOnDepositStep(false);

    handleConfirmButtonClick();
  }, [handleClose, handleConfirmButtonClick, setIsAccountChangedOnDepositStep]);

  const walletIcon = walletMeta?.icon;

  const cryptoPaymentSummaryDialogProps =
    useMemo<ICryptoPaymentSummaryDialogProps>(
      () => ({
        allowanceFeeDetails,
        amount,
        connectedAddress,
        currency,
        depositFeeDetails,
        handleNetworkChange,
        hasEnoughTokenBalance,
        isAccountChangedOnDepositStep,
        isConfirming,
        isLoading,
        isWalletAccountConnecting,
        network,
        networks,
        onAnotherAddressButtonClick: handleConnectWalletAccount,
        onCancelButtonClick,
        onClose,
        onConfirmButtonClick,
        onConnectButtonClick: handleConnectWalletAccount,
        oneTimeAmountProps,
        open: isOpened,
        totalAmount,
        walletIcon,
      }),
      [
        allowanceFeeDetails,
        amount,
        connectedAddress,
        currency,
        depositFeeDetails,
        handleConnectWalletAccount,
        handleNetworkChange,
        hasEnoughTokenBalance,
        isAccountChangedOnDepositStep,
        isConfirming,
        isLoading,
        isOpened,
        isWalletAccountConnecting,
        network,
        networks,
        onCancelButtonClick,
        onClose,
        onConfirmButtonClick,
        oneTimeAmountProps,
        totalAmount,
        walletIcon,
      ],
    );

  return {
    cryptoPaymentSummaryDialogProps,
    handleCryptoPaymentSummaryDialogOpen,
  };
};
