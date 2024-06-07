import { useCallback, useEffect, useRef } from 'react';

import { EPaymentType, ICryptoTransaction } from 'modules/payments/types';
import { isMutationSuccessful } from 'modules/common/utils/isMutationSuccessful';
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
    isDepositConfirming,
    isDepositing,
    network: initialNetwork,
  } = tx;

  const isErrored = Boolean(depositError);
  const isPending = !isErrored && (isDepositing || isDepositConfirming);
  const isSuccessful = !isPending && isConfirmed;

  const { currency, handleCurrencyChange } = useCurrency({
    initialCurrency,
    paymentType: EPaymentType.OneTime,
  });

  const { handleNetworkChange, network, networks } = useNetwork({
    currency,
    initialNetwork,
  });

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
    handleNetworkChange,
    networks,
    oneTimeAmountProps,
    tx,
  });

  const depositDialogRef = useRef(isCryptoPaymentDepositDialogOpened);

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

  useEffect(() => {
    depositDialogRef.current = isCryptoPaymentDepositDialogOpened;
  }, [isCryptoPaymentDepositDialogOpened]);

  useEffect(() => {
    const initDepositFlow = async () => {
      // to init deposit flow
      if (!depositError && isUninitialized) {
        const response = await handleWaitForDepositConfirmation();

        if (isMutationSuccessful(response)) {
          if (depositDialogRef.current) {
            handleCryptoPaymentSuccessDialogOpen();
            handleCryptoPaymentDepositDialogClose();
          }
        }
      }
    };

    initDepositFlow();
  }, [
    depositError,
    handleCryptoPaymentDepositDialogClose,
    handleCryptoPaymentSuccessDialogOpen,
    handleWaitForDepositConfirmation,
    isCryptoPaymentDepositDialogOpened,
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
    isErrored,
    isSuccessful,
    network,
  };
};
