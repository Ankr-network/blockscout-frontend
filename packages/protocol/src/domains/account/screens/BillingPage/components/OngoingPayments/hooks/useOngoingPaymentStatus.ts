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
  const { hasError, loading, isTransactionConfirmingSuccess } = useTopUp();

  const ongoingPaymentStatus = useMemo(() => {
    if (!txHash) {
      return undefined;
    }

    if (hasError) {
      return EOngoingPaymentStatus.Error;
    }

    if (loading) {
      return EOngoingPaymentStatus.Pending;
    }

    if (isTransactionConfirmingSuccess || isConfirmed) {
      return EOngoingPaymentStatus.Success;
    }

    return undefined;
  }, [hasError, isConfirmed, isTransactionConfirmingSuccess, loading, txHash]);

  const isOngoingPaymentSuccess =
    ongoingPaymentStatus === EOngoingPaymentStatus.Success;

  const isOngoingPaymentPending =
    ongoingPaymentStatus === EOngoingPaymentStatus.Pending;

  const isOngoingPaymentError =
    ongoingPaymentStatus === EOngoingPaymentStatus.Error;

  return {
    isOngoingPaymentError,
    isOngoingPaymentPending,
    isOngoingPaymentSuccess,
    ongoingPaymentStatus,
  };
};
