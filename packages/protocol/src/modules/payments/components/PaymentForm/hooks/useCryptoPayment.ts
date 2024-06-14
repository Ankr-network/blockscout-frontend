import { EBlockchain } from 'multirpc-sdk';
import { useCallback } from 'react';

import { ECurrency, INetwork } from 'modules/payments/types';
import { defaultCryptoTx } from 'modules/payments/const';
import { useCryptoTx } from 'modules/payments/hooks/useCreateCryptoTx';
import { useWeb3Service } from 'domains/auth/hooks/useWeb3Service';
import { useAutoupdatedRef } from 'modules/common/hooks/useAutoupdatedRef';
import { useNetworkGuard } from 'modules/common/hooks/useNetworkGuard';

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
    handleResetTxId,
    isAllowanceFeeEstimating,
    isCreating: isTxCreating,
    isDepositFeeEstimating,
    isNativeTokenPriceLoading,
    tx = { ...defaultCryptoTx, amount, currency, network },
  } = useCryptoTx({ amount, currency, network });

  const { handleNetworkSwitch, isNetworkSwitching, isNetworkWrong } =
    useNetworkGuard(network);

  const createCryptoTxRef = useAutoupdatedRef(handleCreateCryptoTx);

  const txId = tx.id;

  const {
    cryptoPaymentDepositDialogProps,
    cryptoPaymentSuccessDialogProps,
    cryptoPaymentSummaryDialogProps,
    handleCryptoPaymentDepositDialogClose,
    handleCryptoPaymentSummaryDialogOpen,
    isCryptoPaymentDepositDialogOpened,
    isCryptoPaymentSummaryDialogOpened,
    isCryptoPaymentSummaryDialogOpening,
    setIsAccountChangedOnDepositStep,
  } = useCryptoPaymentFlow({
    handleNetworkChange,
    handleNetworkSwitch,
    handleResetTxId,
    isAllowanceFeeEstimating,
    isDepositFeeEstimating,
    isNativeTokenPriceLoading,
    isNetworkSwitching,
    isNetworkWrong,
    networks,
    oneTimeAmountProps,
    tx,
  });

  const { handleCreateWeb3Service, isWeb3ServiceCreating } = useWeb3Service();

  useHandleAmountChange({ amount, currency, txId });

  useHandleCurrencyChange({ currency, network, txId });

  useHandleNetworkChange({ currency, network, txId });

  useHandleWalletAccountChange({
    currency,
    handleCreateCryptoTx,
    handleCryptoPaymentDepositDialogClose,
    handleCryptoPaymentSummaryDialogOpen,
    isCryptoPaymentDepositDialogOpened,
    isCryptoPaymentSummaryDialogOpened,
    network,
    setIsAccountChangedOnDepositStep,
    txId,
  });

  const handleCryptoPaymentFlowInit = useCallback(async () => {
    await handleCreateWeb3Service();

    await createCryptoTxRef.current();

    handleCryptoPaymentSummaryDialogOpen();
  }, [
    createCryptoTxRef,
    handleCreateWeb3Service,
    handleCryptoPaymentSummaryDialogOpen,
  ]);

  const isCryptoPaymentFlowInitializing =
    isWeb3ServiceCreating ||
    isTxCreating ||
    isCryptoPaymentSummaryDialogOpening;

  return {
    cryptoPaymentDepositDialogProps,
    cryptoPaymentSuccessDialogProps,
    cryptoPaymentSummaryDialogProps,
    handleCryptoPaymentFlowInit,
    isCryptoPaymentFlowInitializing,
  };
};
