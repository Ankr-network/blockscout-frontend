import { useCallback } from 'react';

import { useOngoingPayments } from 'domains/account/screens/BillingPage/components/OngoingPayments';
import { EOngoingPaymentStatus } from 'modules/billing/types';
import { useTopUp } from 'domains/account/hooks/useTopUp';
import { useMyAllowance } from 'domains/account/hooks/useMyAllowance';

export interface IUseCryptoPaymentPayButtonHandlerProps {
  allowanceTxHash?: string;
  depositTxHash?: string;
  handleCryptoPaymentDepositDialogOpen: () => void;
  handleCryptoPaymentSuccessDialogOpen: () => void;
  handleCryptoPaymentSummaryDialogOpen: () => void;
}

export const useCryptoPaymentPayButtonHandler = ({
  allowanceTxHash,
  depositTxHash,
  handleCryptoPaymentDepositDialogOpen,
  handleCryptoPaymentSuccessDialogOpen,
  handleCryptoPaymentSummaryDialogOpen,
}: IUseCryptoPaymentPayButtonHandlerProps) => {
  const { loadingWaitTransactionConfirming: isTransactionConfirming } =
    useTopUp();

  const { ongoingPaymentStatus } = useOngoingPayments();

  const { fetchMyAllowance } = useMyAllowance({ skipFetching: true });

  const handlePayButtonClick = useCallback(() => {
    const isDepositStep = allowanceTxHash && depositTxHash;
    const hasDepositError =
      isDepositStep && ongoingPaymentStatus === EOngoingPaymentStatus.Error;

    if (ongoingPaymentStatus === EOngoingPaymentStatus.Success) {
      return handleCryptoPaymentSuccessDialogOpen();
    }

    if ((isDepositStep && !hasDepositError) || isTransactionConfirming) {
      return handleCryptoPaymentDepositDialogOpen();
    }

    fetchMyAllowance();

    return handleCryptoPaymentSummaryDialogOpen();
  }, [
    allowanceTxHash,
    depositTxHash,
    fetchMyAllowance,
    handleCryptoPaymentDepositDialogOpen,
    handleCryptoPaymentSuccessDialogOpen,
    handleCryptoPaymentSummaryDialogOpen,
    isTransactionConfirming,
    ongoingPaymentStatus,
  ]);

  return { handlePayButtonClick };
};
