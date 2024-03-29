import { Token } from 'multirpc-sdk';

import { useDialog } from 'modules/common/hooks/useDialog';

import { useSuccessCryptoPaymentProps } from './useSuccessCryptoPaymentProps';
import { useOngoingPayments } from '../components/OngoingPayments/useOngoingPayments';

export const useOngoingCryptoPayment = () => {
  const { isOpened, onClose, onOpen } = useDialog();

  const { txHash = '', approvedAmountString } = useOngoingPayments();

  const { isLoading, successCryptoPaymentDialogProps } =
    useSuccessCryptoPaymentProps({
      amount: approvedAmountString || '0',
      token: Token.ANKR,
      txHash,
      date: new Date(),
      isOpened,
    });

  return {
    isLoading,
    successCryptoPaymentDialogProps,
    isOpened,
    onClose,
    onOpen,
  };
};
