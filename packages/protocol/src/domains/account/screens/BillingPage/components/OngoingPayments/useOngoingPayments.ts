import { useMemo } from 'react';

import { useSelectTopUpTransaction } from 'domains/account/hooks/useSelectTopUpTransaction';
import { useUSDAmountByCryptoAmount } from 'modules/billing/hooks/useUSDAmountByCryptoAmount';
import { ECurrency } from 'modules/billing/types';
import { useTopUp } from 'domains/account/hooks/useTopUp';

import { useTopupInitialStep } from '../../../TopUp/useTopupInitialStep';

export const useOngoingPayments = () => {
  const { isLoading } = useTopupInitialStep();

  const { hasError, loadingWaitTransactionConfirming } = useTopUp();

  const transaction = useSelectTopUpTransaction();

  const txHash = useMemo(
    () => transaction?.topUpTransactionHash,
    [transaction],
  );

  const approvedAmountString = transaction?.approvedAmount?.toString();
  const approvedAmountNumber = Number(transaction?.approvedAmount) || 0;

  const amountToDepositString = transaction?.amountToDeposit?.toString();

  const { amountUsd: approvedUsdAmount = 0 } = useUSDAmountByCryptoAmount({
    amount: approvedAmountNumber,
    currency: ECurrency.ANKR,
  });

  const transactionStatus: 'error' | 'success' | 'pending' | undefined =
    useMemo(() => {
      if (txHash && !loadingWaitTransactionConfirming) {
        return 'success';
      }

      if (hasError) {
        return 'error';
      }

      if (!txHash) {
        return undefined;
      }

      return 'pending';
    }, [hasError, loadingWaitTransactionConfirming, txHash]);

  const shouldShowOngoingPayment = Boolean(transaction?.topUpTransactionHash);

  const isSuccessState =
    transactionStatus === 'success' && txHash && approvedAmountString;

  return {
    txHash,
    approvedAmountString: approvedAmountString || amountToDepositString,
    approvedUsdAmount,
    transactionStatus,
    isLoading,
    shouldShowOngoingPayment,
    isSuccessState,
  };
};
