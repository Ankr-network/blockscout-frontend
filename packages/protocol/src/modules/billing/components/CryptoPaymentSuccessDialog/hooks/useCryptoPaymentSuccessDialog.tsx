import { useCallback, useMemo } from 'react';

import { getTxExplorerUrl } from 'modules/billing/utils/getTxExplorerUrl';
import { useDialog } from 'modules/common/hooks/useDialog';
import { useTxDetails } from 'domains/account/hooks/useTxDetails';
import { useTopUp } from 'domains/account/hooks/useTopUp';

import { ICryptoPaymentSuccessDialogProps } from '../CryptoPaymentSuccessDialog';
import { IUseCryptoPaymentSuccessDialogProps } from '../types';

export const useCryptoPaymentSuccessDialog = ({
  allowanceTxHash,
  amount,
  currency,
  depositTxHash,
  network,
  paymentType,
}: IUseCryptoPaymentSuccessDialogProps) => {
  const {
    isOpened,
    onClose: handleCryptoPaymentSuccessDialogClose,
    onOpen: handleCryptoPaymentSuccessDialogOpen,
  } = useDialog();

  const { handleResetTopUpTransaction } = useTopUp();

  const onClose = useCallback(() => {
    handleResetTopUpTransaction();
    handleCryptoPaymentSuccessDialogClose();
  }, [handleCryptoPaymentSuccessDialogClose, handleResetTopUpTransaction]);

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
  });

  const {
    fee: approvalFee,
    feeUsd: approvalFeeUsd,
    isLoading: isAllowanceTxDataLoading,
  } = useTxDetails({
    amount,
    skipFetching: !isOpened || !allowanceTxHash,
    txHash: allowanceTxHash!,
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
