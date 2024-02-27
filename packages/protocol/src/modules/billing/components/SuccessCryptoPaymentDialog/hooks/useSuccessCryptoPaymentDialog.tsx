import { useMemo } from 'react';

import { useDialog } from 'modules/common/hooks/useDialog';

import { ISuccessCryptoPaymentDialigProps } from '../SuccessCryptoPaymentDialog';
import { IUseSuccessCryptoPaymentDialogProps } from '../types';

export const useSuccessCryptoPaymentDialog = ({
  amount,
  amountUSD,
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
}: IUseSuccessCryptoPaymentDialogProps) => {
  const {
    isOpened,
    onClose,
    onOpen: handleSuccessCryptoPaymentDialogOpen,
  } = useDialog();

  const successCryptoPaymentDialogProps =
    useMemo<ISuccessCryptoPaymentDialigProps>(
      () => ({
        amount,
        amountUSD,
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
        amountUSD,
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
    handleSuccessCryptoPaymentDialogOpen,
    successCryptoPaymentDialogProps,
  };
};
