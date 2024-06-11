import { CONFIRMATION_BLOCKS, EBlockchain } from 'multirpc-sdk';

import { ECurrency } from 'modules/billing/types';
import { useSelectTopUpTransaction } from 'domains/account/hooks/useSelectTopUpTransaction';
import { useUSDAmountByCryptoAmount } from 'modules/billing/hooks/useUSDAmountByCryptoAmount';
import { useAppSelector } from 'store/useAppSelector';
import { selectPaymentOptionsByNetwork } from 'domains/account/store/selectors';

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

  const { confirmationBlocksNumber = CONFIRMATION_BLOCKS } = useAppSelector(
    state =>
      selectPaymentOptionsByNetwork(
        state,
        network ?? EBlockchain.eth,
        currency,
      ),
  );

  const { amountUsd: approvedUsdAmount = 0 } = useUSDAmountByCryptoAmount({
    amount,
    currency,
  });

  useInitTxConfirmation({ onSuccess: onInitTxConfirmationSuccess, txHash });

  const {
    isOngoingPaymentError,
    isOngoingPaymentPending,
    isOngoingPaymentWaiting,
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
    isOngoingPaymentWaiting,
    isSuccessState,
    network,
    ongoingPaymentStatus,
    shouldShowOngoingPayment,
    txHash,
    confirmationBlocksNumber,
  };
};
