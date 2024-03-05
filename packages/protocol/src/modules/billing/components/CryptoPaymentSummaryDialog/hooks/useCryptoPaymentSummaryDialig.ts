import { useCallback, useMemo } from 'react';

import { useConnectedAddress } from 'modules/billing/hooks/useConnectedAddress';
import { useDialog } from 'modules/common/hooks/useDialog';

import { ICryptoPaymentSummaryDialogProps } from '../CryptoPaymentSummaryDialog';
import { IUseCryptoPaymentSummaryDialogProps } from '../types';

export const useCryptoPaymentSummaryDialog = ({
  amount,
  currency,
  network,
}: IUseCryptoPaymentSummaryDialogProps) => {
  const {
    isOpened,
    onClose,
    onOpen: handleCryptoPaymentSummaryDialogOpen,
  } = useDialog();

  const { connectedAddress, walletIcon } = useConnectedAddress();

  // TODO: write logics for handlers
  // https://ankrnetwork.atlassian.net/browse/MRPC-4432
  const onAnotherAddressButtonClick = useCallback(() => {}, []);
  const onCancelButtonClick = onClose;
  const onConfirmButtonClick = useCallback(() => {}, []);
  const onConnectButtonClick = useCallback(() => {}, []);

  const cryptoPaymentSummaryDialogProps =
    useMemo<ICryptoPaymentSummaryDialogProps>(() => {
      const approvalFeeDetails = { feeCrypto: 0.00244, feeUSD: 5.44 };
      const depositFeeDetails = { feeCrypto: 0.00244, feeUSD: 5.44 };

      return {
        amount,
        approvalFeeDetails,
        connectedAddress,
        currency,
        depositFeeDetails,
        network,
        onAnotherAddressButtonClick,
        onCancelButtonClick,
        onClose,
        onConfirmButtonClick,
        onConnectButtonClick,
        open: isOpened,
        walletIcon,
      };
    }, [
      amount,
      connectedAddress,
      currency,
      isOpened,
      network,
      onAnotherAddressButtonClick,
      onCancelButtonClick,
      onClose,
      onConfirmButtonClick,
      onConnectButtonClick,
      walletIcon,
    ]);

  return {
    cryptoPaymentSummaryDialogProps,
    handleCryptoPaymentSummaryDialogOpen,
  };
};
