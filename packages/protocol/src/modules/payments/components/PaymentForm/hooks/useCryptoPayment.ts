import { EBlockchain } from 'multirpc-sdk';
import { useCallback } from 'react';

import { ECurrency, INetwork } from 'modules/payments/types';
import { defaultCryptoTx } from 'modules/payments/const';
import { useCryptoTx } from 'modules/payments/hooks/useCreateCryptoTx';

import { IOneTimeAmountProps } from '../components/OneTimeAmount';
import { useCryptoPaymentFlow } from './useCryptoPaymentFlow';
import { useHandleAmountChange } from './useHandleAmountChange';
import { useHandleCurrencyChange } from './useHandleCurrencyChange';
import { useHandleNetworkChange } from './useHandleNetworkChange';
import { useHandleWalletAccountChange } from './useHandleWalletAccountChange';

export interface IUseOneTimeCryptoPaymentProps {
  amount: number;
  currency: ECurrency;
  handleNetworkChange: (network: EBlockchain) => void;
  network: EBlockchain;
  networks: INetwork[];
  oneTimeAmountProps: IOneTimeAmountProps;
}

export const useCryptoPayment = ({
  amount,
  currency,
  handleNetworkChange,
  network,
  networks,
  oneTimeAmountProps,
}: IUseOneTimeCryptoPaymentProps) => {
  const {
    handleCreateCryptoTx,
    isCreating,
    tx = { ...defaultCryptoTx, amount, currency, network },
  } = useCryptoTx({ amount, currency, network });

  const txId = tx.id;

  const {
    cryptoPaymentDepositDialogProps,
    cryptoPaymentSuccessDialogProps,
    cryptoPaymentSummaryDialogProps,
    handleCryptoPaymentDepositDialogClose,
    handleCryptoPaymentSummaryDialogOpen,
    isCryptoPaymentDepositDialogOpened,
    isCryptoPaymentSummaryDialogOpening,
    setIsAccountChangedOnDepositStep,
  } = useCryptoPaymentFlow({
    handleNetworkChange,
    tx,
    networks,
    oneTimeAmountProps,
  });

  useHandleAmountChange({ amount, currency, txId });

  useHandleCurrencyChange({ currency, network, txId });

  useHandleNetworkChange({ currency, network, txId });

  useHandleWalletAccountChange({
    currency,
    handleCryptoPaymentDepositDialogClose,
    handleCryptoPaymentSummaryDialogOpen,
    isCryptoPaymentDepositDialogOpened,
    network,
    setIsAccountChangedOnDepositStep,
    txId,
  });

  const handleCryptoPaymentFlowInit = useCallback(async () => {
    await handleCreateCryptoTx();

    await handleCryptoPaymentSummaryDialogOpen();
  }, [handleCreateCryptoTx, handleCryptoPaymentSummaryDialogOpen]);

  const isCryptoPaymentFlowInitializing =
    isCreating || isCryptoPaymentSummaryDialogOpening;

  return {
    cryptoPaymentDepositDialogProps,
    cryptoPaymentSuccessDialogProps,
    cryptoPaymentSummaryDialogProps,
    handleCryptoPaymentFlowInit,
    isCryptoPaymentFlowInitializing,
  };
};
