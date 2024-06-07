import BigNumber from 'bignumber.js';
import { EBlockchain } from 'multirpc-sdk';
import { useCallback } from 'react';

import { ICryptoTransaction, INetwork } from 'modules/payments/types';
import { removeCryptoTx } from 'modules/payments/store/paymentsSlice';
import { useAppDispatch } from 'store/useAppDispatch';
import { useConnectWalletAccount } from 'domains/wallet/hooks/useConnectWalletAccount';
import { useWalletAddress } from 'domains/wallet/hooks/useWalletAddress';
import { useWalletBalance } from 'modules/payments/hooks/useWalletBalance';

import { IOneTimeAmountProps } from '../components/OneTimeAmount';
import { useCryptoPaymentSummaryDialog } from '../../CryptoPaymentSummaryDialog';
import { useTotalCryptoAmount } from './useTotalCryptoAmount';

export interface IUseCryptoPaymentSummaryStepProps {
  handleNetworkChange: (network: EBlockchain) => void;
  isAccountChangedOnDepositStep: boolean;
  isConfirming: boolean;
  networks: INetwork[];
  onConfirmButtonClick: () => void;
  oneTimeAmountProps: IOneTimeAmountProps;
  setIsAccountChangedOnDepositStep: (isChanged: boolean) => void;
  tx: ICryptoTransaction;
}

export const useCryptoPaymentSummaryStep = ({
  handleNetworkChange,
  isAccountChangedOnDepositStep,
  isConfirming,
  networks,
  onConfirmButtonClick,
  oneTimeAmountProps,
  setIsAccountChangedOnDepositStep,
  tx,
}: IUseCryptoPaymentSummaryStepProps) => {
  const { walletAddress } = useWalletAddress();

  const {
    allowanceFeeDetailsEstimated: allowanceFeeDetails,
    amount,
    currency,
    depositFeeDetailsEstimated: depositFeeDetails,
    from,
    id: txId,
    network,
  } = tx;

  const {
    handleFetchWalletbalance,
    isLoading: isWalletBalanceLoading,
    walletBalance,
  } = useWalletBalance({
    accountAddress: from || walletAddress!,
    currency,
    network,
    skipFetching: true,
  });

  const { isLoading: isTotalAmountLoading, totalAmount } = useTotalCryptoAmount(
    {
      amount,
      allowanceFeeDetails,
      currency,
      depositFeeDetails,
    },
  );

  const isLoading = isWalletBalanceLoading || isTotalAmountLoading;

  // wrapped by useCallback to explicitly convert to () => Promise<void> type
  const onOpen = useCallback(async () => {
    await handleFetchWalletbalance();
  }, [handleFetchWalletbalance]);

  const dispatch = useAppDispatch();
  const onClose = useCallback(() => {
    dispatch(removeCryptoTx({ id: txId }));
  }, [dispatch, txId]);

  const {
    handleConnectWalletAccount,
    isConnecting: isWalletAccountConnecting,
  } = useConnectWalletAccount();

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
    isConfirming,
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
    isCryptoPaymentSummaryDialogOpening: isLoading,
  };
};
