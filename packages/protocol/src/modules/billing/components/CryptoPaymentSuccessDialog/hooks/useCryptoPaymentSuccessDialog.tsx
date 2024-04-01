import { useMemo } from 'react';

import { useDialog } from 'modules/common/hooks/useDialog';

import { ICryptoPaymentSuccessDialogProps } from '../CryptoPaymentSuccessDialog';
import { IUseCryptoPaymentSuccessDialogProps } from '../types';

export const useCryptoPaymentSuccessDialog = ({
  amount,
  amountUsd,
  approval,
  currency,
  depositFee,
  depositFeeUSD,
  depositTxURL,
  fromAddress,
  network,
  paymentType,
  toAddress,
  txDate,
}: IUseCryptoPaymentSuccessDialogProps) => {
  const {
    isOpened,
    onClose,
    onOpen: handleCryptoPaymentSuccessDialogOpen,
  } = useDialog();

  const cryptoPaymentSuccessDialogProps =
    useMemo<ICryptoPaymentSuccessDialogProps>(
      () => ({
        amount,
        amountUsd,
        approval,
        currency,
        depositFee,
        depositFeeUSD,
        depositTxURL,
        fromAddress,
        network,
        onClose,
        open: isOpened,
        paymentType,
        toAddress,
        txDate,
      }),
      [
        amount,
        amountUsd,
        approval,
        currency,
        depositFee,
        depositFeeUSD,
        depositTxURL,
        fromAddress,
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
