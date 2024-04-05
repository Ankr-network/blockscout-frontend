import { ECurrency, ENetwork, EPaymentType } from 'modules/billing/types';
import { useCryptoPaymentSuccessDialog } from 'modules/billing/components/CryptoPaymentSuccessDialog';

import { useOngoingPayments } from '../components/OngoingPayments/useOngoingPayments';

export const useOngoingCryptoPayment = () => {
  const { txHash = '', approvedAmountString = '0' } = useOngoingPayments();

  const {
    cryptoPaymentSuccessDialogProps,
    handleCryptoPaymentSuccessDialogOpen,
  } = useCryptoPaymentSuccessDialog({
    amount: Number(approvedAmountString),
    currency: ECurrency.ANKR,
    network: ENetwork.ETH,
    paymentType: EPaymentType.OneTime,
    txHash,
  });

  return {
    cryptoPaymentSuccessDialogProps,
    handleCryptoPaymentSuccessDialogOpen,
  };
};
