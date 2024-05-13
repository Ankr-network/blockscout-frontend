import { useCallback, useMemo } from 'react';

import { getTxExplorerUrl } from 'modules/billing/utils/getTxExplorerUrl';
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
  onCloseButtonClick,
  onOpen,
  paymentType,
}: IUseCryptoPaymentSuccessDialogProps) => {
  const {
    isOpened,
    onClose: handleCryptoPaymentSuccessDialogClose,
    onOpen: handleOpen,
  } = useDialog();

  const onClose = useCallback(() => {
    onCloseButtonClick?.();
    handleCryptoPaymentSuccessDialogClose();
  }, [handleCryptoPaymentSuccessDialogClose, onCloseButtonClick]);

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
        depositTxURL: getTxExplorerUrl(network, depositTxHash),
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
