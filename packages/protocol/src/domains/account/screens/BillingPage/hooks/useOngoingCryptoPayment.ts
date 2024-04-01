import { Token } from 'multirpc-sdk';

import { useDialog } from 'modules/common/hooks/useDialog';

import { useCryptoPaymentSuccessDialog } from './useCryptoPaymentSuccessDialog';
import { useOngoingPayments } from '../components/OngoingPayments/useOngoingPayments';

export const useOngoingCryptoPayment = () => {
  const { isOpened, onClose, onOpen } = useDialog();

  const { txHash = '', approvedAmountString = '0' } = useOngoingPayments();

  const { isLoading, cryptoPaymentSuccessDialogProps } =
    useCryptoPaymentSuccessDialog({
      amount: approvedAmountString,
      date: new Date(),
      isOpened,
      token: Token.ANKR,
      txHash,
    });

  return {
    cryptoPaymentSuccessDialogProps,
    isLoading,
    isOpened,
    onClose,
    onOpen,
  };
};
