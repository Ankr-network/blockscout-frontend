import { useCallback } from 'react';

import { ANKR_PAYMENT_NETWORK, MIN_ANKR_AMOUNT } from 'modules/payments/const';
import {
  ECurrency,
  EPaymentType,
  ICryptoTransaction,
} from 'modules/payments/types';
import { removeCryptoTx } from 'modules/payments/store/paymentsSlice';
import { useAppDispatch } from 'store/useAppDispatch';

import { useCryptoPaymentSuccessDialog } from '../../CryptoPaymentSuccessDialog';

export interface IUseCryptoPaymentSummaryStepProps {
  tx: ICryptoTransaction | undefined;
}

export const useCryptoPaymentSuccessStep = ({
  tx,
}: IUseCryptoPaymentSummaryStepProps) => {
  const {
    allowanceTxHash,
    amount = MIN_ANKR_AMOUNT,
    currency = ECurrency.ANKR,
    depositTxHash,
    id: txId,
    network = ANKR_PAYMENT_NETWORK,
  } = tx || {};

  const dispatch = useAppDispatch();

  const onClose = useCallback(() => {
    if (txId) {
      dispatch(removeCryptoTx({ id: txId }));
    }
  }, [dispatch, txId]);

  const {
    cryptoPaymentSuccessDialogProps,
    handleCryptoPaymentSuccessDialogOpen,
  } = useCryptoPaymentSuccessDialog({
    allowanceTxHash,
    amount,
    currency,
    depositTxHash,
    network,
    onClose,
    paymentType: EPaymentType.OneTime,
  });

  return {
    cryptoPaymentSuccessDialogProps,
    handleCryptoPaymentSuccessDialogOpen,
  };
};
