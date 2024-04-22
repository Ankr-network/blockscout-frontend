import { ECurrency } from 'modules/billing/types';
import { useSelectTopUpTransaction } from 'domains/account/hooks/useSelectTopUpTransaction';
import { useUSDAmountByCryptoAmount } from 'modules/billing/hooks/useUSDAmountByCryptoAmount';

import { useOngoingPaymentStatus } from './useOngoingPaymentStatus';

export const useOngoingPayments = () => {
  const transaction = useSelectTopUpTransaction();

  const txHash = transaction?.topUpTransactionHash;

  const approvedAmountString = transaction?.approvedAmount?.toString();
  const approvedAmountNumber = Number(transaction?.approvedAmount) || 0;

  const amountToDepositString = transaction?.amountToDeposit?.toString();

  const { amountUsd: approvedUsdAmount = 0 } = useUSDAmountByCryptoAmount({
    amount: approvedAmountNumber,
    currency: ECurrency.ANKR,
  });

  const { isOngoingPaymentSuccess, ongoingPaymentStatus } =
    useOngoingPaymentStatus({ txHash });

  const shouldShowOngoingPayment = Boolean(txHash);

  const isSuccessState = isOngoingPaymentSuccess && approvedAmountString;

  return {
    approvedAmountString: approvedAmountString || amountToDepositString,
    approvedUsdAmount,
    isSuccessState,
    ongoingPaymentStatus,
    shouldShowOngoingPayment,
    txHash,
  };
};
