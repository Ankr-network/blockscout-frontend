import { EBlockchain } from 'multirpc-sdk';
import { useCallback } from 'react';

import { ECurrency, INetwork } from 'modules/payments/types';
import { defaultCryptoTx } from 'modules/payments/const';
import { useCryptoTx } from 'modules/payments/hooks/useCreateCryptoTx';

import { IOneTimeAmountProps } from '../components/OneTimeAmount';
import { useCryptoPaymentFlow } from './useCryptoPaymentFlow';

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
    isCreating: isCryptoPaymentFlowInitializing,
    tx = defaultCryptoTx,
  } = useCryptoTx({ amount, currency, network });

  const {
    cryptoPaymentDepositDialogProps,
    cryptoPaymentSuccessDialogProps,
    cryptoPaymentSummaryDialogProps,
    handleCryptoPaymentSummaryDialogOpen,
  } = useCryptoPaymentFlow({
    handleNetworkChange,
    tx,
    networks,
    oneTimeAmountProps,
  });

  const handleCryptoPaymentFlowInit = useCallback(async () => {
    await handleCreateCryptoTx();

    handleCryptoPaymentSummaryDialogOpen();
  }, [handleCreateCryptoTx, handleCryptoPaymentSummaryDialogOpen]);

  return {
    cryptoPaymentDepositDialogProps,
    cryptoPaymentSuccessDialogProps,
    cryptoPaymentSummaryDialogProps,
    handleCryptoPaymentFlowInit,
    isCryptoPaymentFlowInitializing,
  };
};
