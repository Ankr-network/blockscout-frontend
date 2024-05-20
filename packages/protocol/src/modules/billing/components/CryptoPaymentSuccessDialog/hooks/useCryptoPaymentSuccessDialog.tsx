import { useCallback, useMemo } from 'react';

import { getTxExplorerUrl } from 'modules/billing/utils/getTxExplorerUrl';
import { useDialog } from 'modules/common/hooks/useDialog';
import { useTxDetails } from 'domains/account/hooks/useTxDetails';

import { ICryptoPaymentSuccessDialogProps } from '../CryptoPaymentSuccessDialog';
import { IUseCryptoPaymentSuccessDialogProps } from '../types';

/* eslint-disable max-lines-per-function */
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
    skipFetching: !isOpened,
    txHash: depositTxHash,
    currency,
    network,
  });

  const {
    fee: approvalFee,
    feeUsd: approvalFeeUsd,
    isLoading: isAllowanceTxDataLoading,
  } = useTxDetails({
    amount,
    skipFetching: !isOpened || !allowanceTxHash,
    txHash: allowanceTxHash!,
    currency,
    network,
  });

  const isLoading = isDepositTxDataLoading || isAllowanceTxDataLoading;

  const cryptoPaymentSuccessDialogProps =
    useMemo<ICryptoPaymentSuccessDialogProps>(
      () => ({
        amount,
        amountUsd: depositAmountUsd,
        approvalFeeDetails: approvalFee
          ? {
              feeCrypto: approvalFee,
              feeUSD: approvalFeeUsd,
            }
          : undefined,
        currency,
        depositFee,
        depositFeeUSD: depositFeeUsd,
        depositTxURL: getTxExplorerUrl(depositTxHash),
        fromAddress,
        network,
        onClose,
        open: isOpened,
        paymentType,
        toAddress,
        txDate,
        isLoading,
      }),
      [
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
