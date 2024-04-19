import { useMemo } from 'react';

import { EOngoingPaymentStatus } from 'modules/billing/types';
import { useTopUp } from 'domains/account/hooks/useTopUp';

export interface IUseOngoingPaymentStatusProps {
  txHash?: string;
}

export const useOngoingPaymentStatus = ({
  txHash,
}: IUseOngoingPaymentStatusProps) => {
  const { hasError, loading } = useTopUp();

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

    return EOngoingPaymentStatus.Success;
  }, [hasError, loading, txHash]);

  const isOngoingPaymentSuccess =
    ongoingPaymentStatus === EOngoingPaymentStatus.Success;

  return { isOngoingPaymentSuccess, ongoingPaymentStatus };
};
