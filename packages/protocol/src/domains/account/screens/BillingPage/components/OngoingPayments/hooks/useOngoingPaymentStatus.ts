import { useMemo } from 'react';

import { EOngoingPaymentStatus } from 'modules/billing/types';
import { useTopUp } from 'domains/account/hooks/useTopUp';

export interface IUseOngoingPaymentStatusProps {
  txHash?: string;
  isConfirmed?: boolean;
}

export const useOngoingPaymentStatus = ({
  txHash,
  isConfirmed,
}: IUseOngoingPaymentStatusProps) => {
  const {
    hasError,
    loading,
    isTransactionConfirmingSuccess,
    loadingWaitTransactionConfirming,
  } = useTopUp();

  const ongoingPaymentStatus = useMemo(() => {
    if (!txHash) {
      return undefined;
    }

    if (hasError) {
      return EOngoingPaymentStatus.Error;
    }

    if (loadingWaitTransactionConfirming) {
      return EOngoingPaymentStatus.ConfirmationBlocksWaiting;
    }

    if (loading) {
      return EOngoingPaymentStatus.Pending;
    }

    if (isTransactionConfirmingSuccess || isConfirmed) {
      return EOngoingPaymentStatus.Success;
    }

    return undefined;
  }, [
    hasError,
    isConfirmed,
    isTransactionConfirmingSuccess,
    loading,
    loadingWaitTransactionConfirming,
    txHash,
  ]);

  const isOngoingPaymentSuccess =
    ongoingPaymentStatus === EOngoingPaymentStatus.Success;

  const isOngoingPaymentPending =
    ongoingPaymentStatus === EOngoingPaymentStatus.Pending;

  const isOngoingPaymentWaiting =
    ongoingPaymentStatus === EOngoingPaymentStatus.ConfirmationBlocksWaiting;

  const isOngoingPaymentError =
    ongoingPaymentStatus === EOngoingPaymentStatus.Error;

  return {
    isOngoingPaymentError,
    isOngoingPaymentPending,
    isOngoingPaymentWaiting,
    isOngoingPaymentSuccess,
    ongoingPaymentStatus,
  };
};
