import { EBlockchain, Web3Address } from 'multirpc-sdk';
import { useCallback, useState } from 'react';

import { ECurrency, EPaymentType } from 'modules/billing/types';
import { useDialog } from 'modules/common/hooks/useDialog';
import { useSelectTopUpTransaction } from 'domains/account/hooks/useSelectTopUpTransaction';
import { useTopUp } from 'domains/account/hooks/useTopUp';

import { INetworkSelectOption } from '../../NetworkSelect';
import { IOneTimeAmountProps } from '../components/OneTimeAmount';
import { useAccountsChangedHandlingOnSummaryStep } from './useAccountsChangedHandlingOnSummaryStep';
import { useCryptoDepositStep } from './useCryptoDepositStep';
import { useCryptoPaymentPayButtonHandler } from './useCryptoPaymentPayButtonHandler';
import { useCryptoPaymentSuccessDialog } from '../../CryptoPaymentSuccessDialog';
import { useCryptoPaymentSummaryDialog } from '../../CryptoPaymentSummaryDialog';
import { useOneTimeCryptoFees } from './useOneTimeCryptoFees';
import { useTotalCryptoAmount } from './useTotalCryptoAmount';

export interface IUseOneTimeCryptoPaymentProps {
  amount: number;
  currency: ECurrency;
  handleNetworkChange: (network: EBlockchain) => void;
  network: EBlockchain;
  networkOptions: INetworkSelectOption[];
  onConnectAccount: (connectedAddress: Web3Address) => void;
  oneTimeAmountProps: IOneTimeAmountProps;
}

export const useOneTimeCryptoPayment = ({
  amount,
  currency: formCurrency,
  handleNetworkChange,
  network,
  networkOptions,
  onConnectAccount: onConnectAccountSuccess,
  oneTimeAmountProps,
}: IUseOneTimeCryptoPaymentProps) => {
  const [isAccountChangedOnDepositStep, setIsAccountChangedOnDepositStep] =
    useState(false);

  const {
    amountToDeposit,
    handleResetTopUpTransaction,
    handleResetDeposit,
    transactionCurrency,
  } = useTopUp();

  const currency = transactionCurrency ?? formCurrency;

  const transaction = useSelectTopUpTransaction();
  const depositTxHash = transaction?.topUpTransactionHash;
  const allowanceTxHash = transaction?.allowanceTransactionHash;

  const {
    approvalFeeDetails,
    depositFeeDetails,
    hasEnoughTokenBalance,
    isLoading: cryptoFeesLoading,
    refetchANKRBalance,
    isWalletTokenBalanceLoading,
  } = useOneTimeCryptoFees({
    allowanceTxHash,
    amount,
    currency,
    depositTxHash,
    network,
  });

  useAccountsChangedHandlingOnSummaryStep();

  const { isLoading: isTotalAmountLoading, totalAmount } = useTotalCryptoAmount(
    {
      amount,
      approvalFeeDetails,
      currency,
      depositFeeDetails,
    },
  );

  const handleCryptoPaymentSuccessDialogClose = useCallback(() => {
    handleResetTopUpTransaction();
    handleResetDeposit();
  }, [handleResetDeposit, handleResetTopUpTransaction]);

  const {
    cryptoPaymentSuccessDialogProps,
    handleCryptoPaymentSuccessDialogOpen,
  } = useCryptoPaymentSuccessDialog({
    allowanceTxHash,
    amount: amountToDeposit.toNumber(),
    currency,
    depositTxHash: depositTxHash ?? '',
    network,
    onClose: handleCryptoPaymentSuccessDialogClose,
    paymentType: EPaymentType.OneTime,
  });

  const {
    isOpened: isCryptoPaymentDepositDialogOpened,
    onClose: onCryptoPaymentDepositDialogClose,
    onOpen: handleCryptoPaymentDepositDialogOpen,
  } = useDialog();

  const {
    handleCryptoPaymentSummaryDialogOpen,
    cryptoPaymentSummaryDialogProps: cryptoPaymentSummaryProps,
  } = useCryptoPaymentSummaryDialog({
    approvalFeeDetails,
    currency,
    depositFeeDetails,
    network,
    amount,
    hasEnoughTokenBalance,
    isAccountChangedOnDepositStep,
    isWalletTokenBalanceLoading,
    onConfirmButtonClick: handleCryptoPaymentDepositDialogOpen,
    onConnectAccountSuccess,
    onOpen: refetchANKRBalance,
    setIsAccountChangedOnDepositStep,
    totalAmount,
    networkOptions,
    oneTimeAmountProps,
    handleNetworkChange,
  });

  const { isLoadingRate, cryptoDepositDialogProps } = useCryptoDepositStep({
    approvalFeeDetails,
    currency,
    depositFeeDetails,
    network,
    setIsAccountChangedOnDepositStep,
    handleCryptoPaymentDepositDialogOpen,
    handleCryptoPaymentSummaryDialogOpen,
    isCryptoPaymentDepositDialogOpened,
    onCryptoPaymentDepositDialogClose,
    onDepositSuccess: handleCryptoPaymentSuccessDialogOpen,
  });

  const { handlePayButtonClick } = useCryptoPaymentPayButtonHandler({
    allowanceTxHash,
    depositTxHash,
    handleCryptoPaymentDepositDialogOpen,
    handleCryptoPaymentSuccessDialogOpen,
    handleCryptoPaymentSummaryDialogOpen,
  });

  return {
    cryptoPaymentDepositDialogProps: cryptoDepositDialogProps,
    cryptoPaymentSuccessDialogProps,
    cryptoPaymentSummaryProps,
    handlePayButtonClick,
    isLoading: cryptoFeesLoading || isLoadingRate || isTotalAmountLoading,
  };
};
