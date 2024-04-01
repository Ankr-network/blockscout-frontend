import { useMemo } from 'react';

import { useSelectTopUpTransaction } from 'domains/account/hooks/useSelectTopUpTransaction';
import { useUSDAmountByCryptoAmount } from 'modules/billing/hooks/useUSDAmountByCryptoAmount';
import { ECurrency } from 'modules/billing/types';
import { useTopUp } from 'domains/account/hooks/useTopUp';

import { useTopupInitialStep } from '../../../TopUp/useTopupInitialStep';

export const useOngoingPayments = () => {
  const { isLoading } = useTopupInitialStep();

  const { hasError } = useTopUp();

  const transaction = useSelectTopUpTransaction();

  const txHash = useMemo(
    () =>
      transaction?.topUpTransactionHash ||
      transaction?.allowanceTransactionHash,
    [transaction],
  );

  const approvedAmountString = transaction?.approvedAmount?.toString();
  const approvedAmountNumber = Number(transaction?.approvedAmount) || 0;

  const { amountUsd: approvedUsdAmount = 0 } = useUSDAmountByCryptoAmount({
    amount: approvedAmountNumber,
    currency: ECurrency.ANKR,
  });

  const transactionStatus: 'error' | 'success' | 'pending' | undefined =
    useMemo(() => {
      if (transaction?.topUpTransactionHash) {
        return 'success';
      }

      if (hasError) {
        return 'error';
      }

      if (!transaction) {
        return undefined;
      }

      return 'pending';
    }, [hasError, transaction]);

  const shouldShowOngoingPayment = approvedAmountNumber > 0;

  return {
    txHash,
    amount: transaction?.amount,
    approvedAmountString,
    approvedUsdAmount,
    transactionStatus,
    isLoading,
    shouldShowOngoingPayment,
  };
};
