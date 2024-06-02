import BigNumber from 'bignumber.js';
import { EBlockchain } from 'multirpc-sdk';
import { useCallback } from 'react';

import { ICryptoTransaction, INetwork } from 'modules/payments/types';
import { removeCryptoTx } from 'modules/payments/store/paymentsSlice';
import { useAppDispatch } from 'store/useAppDispatch';
import { useConnectWalletAccount } from 'domains/wallet/hooks/useConnectWalletAccount';
import { useEstimatedAllowanceFee } from 'modules/payments/hooks/useEstimatedAllowanceFee';
import { useEstimatedDepositFee } from 'modules/payments/hooks/useEstimatedDepositFee';
import { useNativeTokenPrice } from 'modules/payments/hooks/useNativeTokenPrice';
import { useWalletBalance } from 'modules/payments/hooks/useWalletBalance';

import { IOneTimeAmountProps } from '../components/OneTimeAmount';
import { useCryptoPaymentSummaryDialog } from '../../CryptoPaymentSummaryDialog';
import { useTotalCryptoAmount } from './useTotalCryptoAmount';
import { useHandleWalletAccountChange } from './useHandleWalletAccountChange';

export interface IUseCryptoPaymentSummaryStepProps {
  handleNetworkChange: (network: EBlockchain) => void;
  isAccountChangedOnDepositStep: boolean;
  networks: INetwork[];
  onConfirmButtonClick: () => void;
  oneTimeAmountProps: IOneTimeAmountProps;
  setIsAccountChangedOnDepositStep: (isChanged: boolean) => void;
  tx: ICryptoTransaction;
}

export const useCryptoPaymentSummaryStep = ({
  handleNetworkChange,
  isAccountChangedOnDepositStep,
  networks,
  onConfirmButtonClick,
  oneTimeAmountProps,
  setIsAccountChangedOnDepositStep,
  tx,
}: IUseCryptoPaymentSummaryStepProps) => {
  const {
    amount,
    currency,
    id: txId,
    network,
    allowanceFeeDetailsEstimated: allowanceFeeDetails,
    depositFeeDetailsEstimated: depositFeeDetails,
  } = tx;

  const { handleFetchNativeTokenPrice, isLoading: isNativeTokenPriceLoading } =
    useNativeTokenPrice({ network, skipFetching: true });

  const {
    handleFetchEstimatedAllowanceFee,
    isEstimating: isAllowanceFeeEstimating,
  } = useEstimatedAllowanceFee({ currency, skipFetching: true, txId });

  const {
    handleFetchEstimatedDepositFee,
    isEstimating: isDepositFeeEstimating,
  } = useEstimatedDepositFee({ currency, skipFetching: true, txId });

  const {
    handleFetchWalletbalance,
    isLoading: isWalletBalanceLoading,
    walletBalance,
  } = useWalletBalance({ currency, network, skipFetching: true });

  const { isLoading: isTotalAmountLoading, totalAmount } = useTotalCryptoAmount(
    {
      amount,
      allowanceFeeDetails,
      currency,
      depositFeeDetails,
    },
  );

  const isLoading =
    isNativeTokenPriceLoading ||
    isAllowanceFeeEstimating ||
    isDepositFeeEstimating ||
    isWalletBalanceLoading ||
    isTotalAmountLoading;

  const dispatch = useAppDispatch();
  const { handleWalletAccountChange } = useHandleWalletAccountChange({
    currency,
    network,
    setIsAccountChangedOnDepositStep,
    txId,
  });

  const onOpen = useCallback(async () => {
    await handleFetchNativeTokenPrice();
    await handleFetchEstimatedAllowanceFee();
    await handleFetchEstimatedDepositFee();
    await handleFetchWalletbalance();
  }, [
    handleFetchEstimatedAllowanceFee,
    handleFetchEstimatedDepositFee,
    handleFetchNativeTokenPrice,
    handleFetchWalletbalance,
  ]);

  const onClose = useCallback(() => {
    dispatch(removeCryptoTx({ id: txId }));
  }, [dispatch, txId]);

  const {
    handleConnectWalletAccount,
    isConnecting: isWalletAccountConnecting,
  } = useConnectWalletAccount({ onSuccess: handleWalletAccountChange });

  const hasEnoughTokenBalance = new BigNumber(walletBalance).gte(amount);

  const {
    cryptoPaymentSummaryDialogProps,
    handleCryptoPaymentSummaryDialogOpen,
  } = useCryptoPaymentSummaryDialog({
    allowanceFeeDetails,
    amount,
    currency,
    depositFeeDetails,
    handleConnectWalletAccount,
    handleNetworkChange,
    hasEnoughTokenBalance,
    isAccountChangedOnDepositStep,
    isLoading,
    isWalletAccountConnecting,
    network,
    networks,
    onClose,
    onConfirmButtonClick,
    onOpen,
    oneTimeAmountProps,
    setIsAccountChangedOnDepositStep,
    totalAmount,
  });

  return {
    cryptoPaymentSummaryDialogProps,
    handleCryptoPaymentSummaryDialogOpen,
  };
};
