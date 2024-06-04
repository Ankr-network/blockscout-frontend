import { useCallback, useMemo } from 'react';

import { getTxExplorerUrl } from 'modules/payments/utils/getTxExplorerUrl';
import { useDialog } from 'modules/common/hooks/useDialog';
import { useTxDetails } from 'modules/payments/hooks/useTxDetails';

import { ICryptoPaymentSuccessDialogProps } from '../CryptoPaymentSuccessDialog';
import { IUseCryptoPaymentSuccessDialogProps } from '../types';

export const useCryptoPaymentSuccessDialog = ({
  allowanceTxHash,
  amount,
  currency,
  depositTxHash,
  network,
  onClose: handleClose,
  paymentType,
}: IUseCryptoPaymentSuccessDialogProps) => {
  const {
    isOpened,
    onClose: handleCryptoPaymentSuccessDialogClose,
    onOpen: handleCryptoPaymentSuccessDialogOpen,
  } = useDialog();

  const onClose = useCallback(() => {
    handleClose?.();
    handleCryptoPaymentSuccessDialogClose();
  }, [handleClose, handleCryptoPaymentSuccessDialogClose]);

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
    fee: allowanceFee,
    feeUsd: allowanceFeeUsd,
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
        allowanceFeeDetails: allowanceFee
          ? { feeCrypto: allowanceFee, feeUSD: allowanceFeeUsd }
          : undefined,
        allowanceTxURL: getTxExplorerUrl(network, allowanceTxHash),
        currency,
        depositFee,
        depositFeeUSD: depositFeeUsd,
        depositTxURL: getTxExplorerUrl(network, depositTxHash),
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
        allowanceFee,
        allowanceFeeUsd,
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
