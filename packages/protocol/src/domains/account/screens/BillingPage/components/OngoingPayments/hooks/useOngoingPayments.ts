import { ECurrency } from 'modules/billing/types';
import { useSelectTopUpTransaction } from 'domains/account/hooks/useSelectTopUpTransaction';
import { useUSDAmountByCryptoAmount } from 'modules/billing/hooks/useUSDAmountByCryptoAmount';

import {
  TOnInitTxConfirmationSuccess,
  useInitTxConfirmation,
} from './useInitTxConfirmation';
import { useOngoingPaymentStatus } from './useOngoingPaymentStatus';

export interface IUseOngoingPaymentsProps {
  onInitTxConfirmationSuccess?: TOnInitTxConfirmationSuccess;
}

export const useOngoingPayments = ({
  onInitTxConfirmationSuccess,
}: IUseOngoingPaymentsProps | void = {}) => {
  const transaction = useSelectTopUpTransaction();

  const txHash = transaction?.topUpTransactionHash;
  const isConfirmed = transaction?.isConfirmed;
  const network = transaction?.network;
  const currency = transaction?.currency ?? ECurrency.ANKR;

  const amount = Number(transaction?.amountToDeposit) || 0;
  const amountString = transaction?.amountToDeposit?.toString();

  const { amountUsd: approvedUsdAmount = 0 } = useUSDAmountByCryptoAmount({
    amount,
    currency,
  });

  useInitTxConfirmation({ onSuccess: onInitTxConfirmationSuccess, txHash });

  const {
    isOngoingPaymentError,
    isOngoingPaymentPending,
    isOngoingPaymentSuccess,
    ongoingPaymentStatus,
  } = useOngoingPaymentStatus({ isConfirmed, txHash });

  const shouldShowOngoingPayment = Boolean(txHash);

  const isSuccessState = isOngoingPaymentSuccess && amountString;

  return {
    amountString,
    approvedUsdAmount,
    currency,
    isOngoingPaymentError,
    isOngoingPaymentPending,
    isSuccessState,
    network,
    ongoingPaymentStatus,
    shouldShowOngoingPayment,
    txHash,
  };
};
