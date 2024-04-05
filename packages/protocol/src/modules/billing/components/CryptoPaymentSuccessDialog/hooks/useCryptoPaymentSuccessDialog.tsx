import { useMemo } from 'react';

import { getTxExplorerUrl } from 'modules/billing/utils/getTxExplorerUrl';
import { useDialog } from 'modules/common/hooks/useDialog';
import { useTxDetails } from 'domains/account/hooks/useTxDetails';

import { ICryptoPaymentSuccessDialogProps } from '../CryptoPaymentSuccessDialog';
import { IUseCryptoPaymentSuccessDialogProps } from '../types';

export const useCryptoPaymentSuccessDialog = ({
  amount,
  approval,
  currency,
  network,
  paymentType,
  txHash,
}: IUseCryptoPaymentSuccessDialogProps) => {
  const {
    isOpened,
    onClose,
    onOpen: handleCryptoPaymentSuccessDialogOpen,
  } = useDialog();

  const {
    isLoading,
    depositAmountUsd,
    depositFee,
    depositFeeUsd,
    fromAddress,
    toAddress,
    txDate,
  } = useTxDetails({
    amount,
    skipFetching: !isOpened,
    txHash,
  });

  const cryptoPaymentSuccessDialogProps =
    useMemo<ICryptoPaymentSuccessDialogProps>(
      () => ({
        amount,
        amountUsd: depositAmountUsd,
        approval,
        currency,
        depositFee,
        depositFeeUSD: depositFeeUsd,
        depositTxURL: getTxExplorerUrl(txHash),
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
        approval,
        currency,
        depositAmountUsd,
        depositFee,
        depositFeeUsd,
        fromAddress,
        isLoading,
        isOpened,
        network,
        onClose,
        paymentType,
        toAddress,
        txDate,
        txHash,
      ],
    );

  return {
    cryptoPaymentSuccessDialogProps,
    handleCryptoPaymentSuccessDialogOpen,
  };
};
