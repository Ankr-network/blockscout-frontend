import { useCallback, useEffect, useRef } from 'react';

import { EPaymentType, ICryptoTransaction } from 'modules/payments/types';
import { useCryptoPaymentFlow } from 'modules/payments/components/PaymentForm/hooks/useCryptoPaymentFlow';
import { useCurrency } from 'modules/payments/components/PaymentForm/hooks/useCurrency';
import { useMinAmount } from 'modules/payments/components/PaymentForm/hooks/useMinAmount';
import { useNetwork } from 'modules/payments/components/PaymentForm/hooks/useNetwork';
import { useOneTimeAmount } from 'modules/payments/components/PaymentForm/components/OneTimeAmount';
import { useUsdAmountByCryptoAmount } from 'modules/payments/hooks/useUsdAmountByCryptoAmount';
import { useWaitForDepositConfirmation } from 'modules/payments/hooks/useWaitForDepositConfirmation';

export interface IUseOngoingPaymentProps {
  tx: ICryptoTransaction;
}

export const useOngoingPayment = ({ tx }: IUseOngoingPaymentProps) => {
  const {
    amount,
    currency: initialCurrency,
    depositError,
    isConfirmed = false,
    isDepositConfirming = false,
    isDepositing = false,
    network: initialNetwork,
  } = tx;

  const isErrored = Boolean(depositError);
  const isPending = !isErrored && isDepositing;
  const isConfirming = !isErrored && isDepositConfirming;
  const isSuccessful = !isErrored && !isPending && !isConfirming && isConfirmed;

  const { currency, handleCurrencyChange } = useCurrency({
    initialCurrency,
    paymentType: EPaymentType.OneTime,
  });

  const { network, networks } = useNetwork({ currency, initialNetwork });

  const minAmount = useMinAmount({ currency, network });

  const { oneTimeAmountProps } = useOneTimeAmount({
    currency,
    handleCurrencyChange,
    minAmount,
  });

  const { amountUsd } = useUsdAmountByCryptoAmount({ amount, currency });

  const {
    cryptoPaymentDepositDialogProps,
    cryptoPaymentSuccessDialogProps,
    cryptoPaymentSummaryDialogProps,
    handleCryptoPaymentDepositDialogClose,
    handleCryptoPaymentDepositDialogOpen,
    handleCryptoPaymentSuccessDialogOpen,
    isCryptoPaymentDepositDialogOpened,
  } = useCryptoPaymentFlow({
    networks,
    oneTimeAmountProps,
    tx,
  });

  const { handleWaitForDepositConfirmation, isUninitialized } =
    useWaitForDepositConfirmation({ tx });

  const handleDetailsButtonClick = useCallback(() => {
    if (isSuccessful) {
      handleCryptoPaymentSuccessDialogOpen();
    } else {
      handleCryptoPaymentDepositDialogOpen({ shouldFetchAllowance: false });
    }
  }, [
    handleCryptoPaymentDepositDialogOpen,
    handleCryptoPaymentSuccessDialogOpen,
    isSuccessful,
  ]);

  // we need this ref to be able to use the actuall value in the callback
  // that called on successful result of handleWaitForDepositConfirmation fn.
  const isDepositDialogOpenedRef = useRef(isCryptoPaymentDepositDialogOpened);

  useEffect(() => {
    isDepositDialogOpenedRef.current = isCryptoPaymentDepositDialogOpened;
  }, [isCryptoPaymentDepositDialogOpened]);

  useEffect(() => {
    // to init deposit flow
    if (!depositError && isUninitialized) {
      handleWaitForDepositConfirmation().then(() => {
        if (isDepositDialogOpenedRef.current) {
          handleCryptoPaymentSuccessDialogOpen();
          handleCryptoPaymentDepositDialogClose();
        }
      });
    }
  }, [
    depositError,
    handleCryptoPaymentDepositDialogClose,
    handleCryptoPaymentSuccessDialogOpen,
    handleWaitForDepositConfirmation,
    isUninitialized,
  ]);

  return {
    amount,
    amountUsd,
    cryptoPaymentDepositDialogProps,
    cryptoPaymentSuccessDialogProps,
    cryptoPaymentSummaryDialogProps,
    currency,
    handleDetailsButtonClick,
    isConfirming,
    isErrored,
    isSuccessful,
    network,
  };
};
