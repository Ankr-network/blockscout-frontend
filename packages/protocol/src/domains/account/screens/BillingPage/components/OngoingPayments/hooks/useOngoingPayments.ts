import { ECurrency } from 'modules/billing/types';
import { useSelectTopUpTransaction } from 'domains/account/hooks/useSelectTopUpTransaction';
import { useUSDAmountByCryptoAmount } from 'modules/billing/hooks/useUSDAmountByCryptoAmount';

import { useOngoingPaymentStatus } from './useOngoingPaymentStatus';

export const useOngoingPayments = () => {
  const transaction = useSelectTopUpTransaction();

  const txHash = transaction?.topUpTransactionHash;
  const network = transaction?.network;
  const currency = transaction?.currency ?? ECurrency.ANKR;

  const depositAmountString = transaction?.amountToDeposit?.toString();
  const depositAmountNumber = Number(transaction?.amountToDeposit) || 0;

  const { amountUsd: approvedUsdAmount = 0 } = useUSDAmountByCryptoAmount({
    amount: depositAmountNumber,
    currency,
  });

  const {
    isOngoingPaymentError,
    isOngoingPaymentPending,
    isOngoingPaymentSuccess,
    ongoingPaymentStatus,
  } = useOngoingPaymentStatus({ txHash });

  const shouldShowOngoingPayment = Boolean(txHash);

  const isSuccessState = isOngoingPaymentSuccess && depositAmountString;

  return {
    approvedAmountString: depositAmountString,
    approvedUsdAmount,
    isOngoingPaymentError,
    isOngoingPaymentPending,
    isSuccessState,
    ongoingPaymentStatus,
    shouldShowOngoingPayment,
    txHash,
    currency,
    network,
  };
};
