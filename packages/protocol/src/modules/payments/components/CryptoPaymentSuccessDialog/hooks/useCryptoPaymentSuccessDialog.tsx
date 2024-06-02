import { useCallback, useMemo } from 'react';

import { getTxExplorerUrl } from 'modules/payments/utils/getTxExplorerUrl';
import { useDialog } from 'modules/common/hooks/useDialog';
import { useTxDetails } from 'domains/account/hooks/useTxDetails';

import { ICryptoPaymentSuccessDialogProps } from '../CryptoPaymentSuccessDialog';
import { IUseCryptoPaymentSuccessDialogProps } from '../types';

export const useCryptoPaymentSuccessDialog = ({
  allowanceTxHash,
  amount,
  currency,
  depositTxHash,
  network,
  onClose: handleClose,
  onOpen,
  paymentType,
}: IUseCryptoPaymentSuccessDialogProps) => {
  const {
    isOpened,
    onClose: handleCryptoPaymentSuccessDialogClose,
    onOpen: handleOpen,
  } = useDialog();

  const onClose = useCallback(() => {
    handleClose?.();
    handleCryptoPaymentSuccessDialogClose();
  }, [handleClose, handleCryptoPaymentSuccessDialogClose]);

  const handleCryptoPaymentSuccessDialogOpen = useCallback(async () => {
    await onOpen?.();

    handleOpen();
  }, [onOpen, handleOpen]);

  const {
    amountUsd: depositAmountUsd,
    fee: depositFee,
    feeUsd: depositFeeUsd,
    fromAddress,
    isLoading: isDepositTxDataLoading,
    toAddress,
    txDate,
  } = useTxDetails({
    amount,
    currency,
    network,
    skipFetching: !isOpened || !depositTxHash,
    txHash: depositTxHash!,
  });

  const {
    fee: approvalFee,
    feeUsd: approvalFeeUsd,
    isLoading: isAllowanceTxDataLoading,
  } = useTxDetails({
    amount,
    currency,
    network,
    skipFetching: !isOpened || !allowanceTxHash,
    txHash: allowanceTxHash!,
  });

  const isLoading = isDepositTxDataLoading || isAllowanceTxDataLoading;

  const cryptoPaymentSuccessDialogProps =
    useMemo<ICryptoPaymentSuccessDialogProps>(
      () => ({
        amount,
        amountUsd: depositAmountUsd,
        allowanceFeeDetails: approvalFee
          ? { feeCrypto: approvalFee, feeUSD: approvalFeeUsd }
          : undefined,
        allowanceTxURL: getTxExplorerUrl(allowanceTxHash),
        currency,
        depositFee,
        depositFeeUSD: depositFeeUsd,
        depositTxURL: getTxExplorerUrl(depositTxHash),
        fromAddress,
        isLoading,
        network,
        onClose,
        open: isOpened,
        paymentType,
        toAddress,
        txDate,
      }),
      [
        allowanceTxHash,
        amount,
        approvalFee,
        approvalFeeUsd,
        currency,
        depositAmountUsd,
        depositFee,
        depositFeeUsd,
        depositTxHash,
        fromAddress,
        isLoading,
        isOpened,
        network,
        onClose,
        paymentType,
        toAddress,
        txDate,
      ],
    );

  return {
    cryptoPaymentSuccessDialogProps,
    handleCryptoPaymentSuccessDialogOpen,
  };
};
