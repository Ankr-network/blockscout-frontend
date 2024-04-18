import { Web3Address } from 'multirpc-sdk';
import { useCallback, useState } from 'react';

import { ECurrency, ENetwork, EPaymentType } from 'modules/billing/types';
import { useDialog } from 'modules/common/hooks/useDialog';
import { useHasWeb3Service } from 'domains/auth/hooks/useHasWeb3Service';
import { useLazyFetchMyAllowanceQuery } from 'domains/account/actions/fetchMyAllowance';
import { useNativeTokenPrice } from 'domains/account/hooks/useNativeTokenPrice';
import { useOngoingPayments } from 'domains/account/screens/BillingPage/components/OngoingPayments/useOngoingPayments';
import { useSelectTopUpTransaction } from 'domains/account/hooks/useSelectTopUpTransaction';

import { useAccountsChangedHandlingOnSummaryStep } from './useAccountsChangedHandlingOnSummaryStep';
import { useCryptoDepositStep } from './useCryptoDepositStep';
import { useCryptoPaymentSuccessDialog } from '../../CryptoPaymentSuccessDialog';
import { useCryptoPaymentSummaryDialog } from '../../CryptoPaymentSummaryDialog';
import { useEstimatedANKRAllowanceFeeDetails } from './useEstimatedANKRAllowanceFeeDetails';
import { useEstimatedANKRDepositFeeDetails } from './useEstimatedANKRDepositFeeDetails';
import { useHasEnoughTokenBalance } from './useHasEnoughTokenBalance';
import { useTotalCryptoAmount } from './useTotalCryptoAmount';

export interface IUseOneTimeCryptoPaymentProps {
  amount: number;
  currency: ECurrency;
  onConnectAccount: (connectedAddress: Web3Address) => void;
  onCryptoPaymentFlowClose: () => void;
}

export const useOneTimeCryptoPayment = ({
  amount,
  currency,
  onConnectAccount: onConnectAccountSuccess,
  onCryptoPaymentFlowClose,
}: IUseOneTimeCryptoPaymentProps) => {
  const [isAccountChangedOnDepositStep, setIsAccountChangedOnDepositStep] =
    useState(false);

  const { hasWeb3Service } = useHasWeb3Service();

  const { hasEnoughTokenBalance, isWalletTokenBalanceLoading } =
    useHasEnoughTokenBalance({ amount });

  const { price, isLoading: isNativeTokenPriceLoading } = useNativeTokenPrice({
    skipFetching: !hasWeb3Service,
  });

  const { approvalFeeDetails, isLoading: isAllowanceFeeLoading } =
    useEstimatedANKRAllowanceFeeDetails({ amount, price });

  const { depositFeeDetails, isLoading: isDepositFeeLoading } =
    useEstimatedANKRDepositFeeDetails({ amount, price });

  useAccountsChangedHandlingOnSummaryStep();

  const { isLoading: isTotalAmountLoading, totalAmount } = useTotalCryptoAmount(
    {
      amount,
      approvalFeeDetails,
      currency,
      depositFeeDetails,
    },
  );

  const transaction = useSelectTopUpTransaction();
  const depositTxHash = transaction?.topUpTransactionHash;
  const allowanceTxHash = transaction?.allowanceTransactionHash;

  const {
    cryptoPaymentSuccessDialogProps,
    handleCryptoPaymentSuccessDialogOpen,
  } = useCryptoPaymentSuccessDialog({
    allowanceTxHash,
    amount,
    currency,
    depositTxHash: depositTxHash ?? '',
    network: ENetwork.ETH,
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
    amount,
    approvalFeeDetails,
    currency,
    depositFeeDetails,
    hasEnoughTokenBalance,
    isAccountChangedOnDepositStep,
    isWalletTokenBalanceLoading,
    network: ENetwork.ETH,
    onClose: onCryptoPaymentFlowClose,
    onConfirmButtonClick: handleCryptoPaymentDepositDialogOpen,
    onConnectAccountSuccess,
    setIsAccountChangedOnDepositStep,
    totalAmount,
  });

  const { isLoadingRate, cryptoDepositDialogProps } = useCryptoDepositStep({
    approvalFeeDetails,
    currency,
    depositFeeDetails,
    handleCryptoPaymentDepositDialogOpen,
    handleCryptoPaymentSummaryDialogOpen,
    isCryptoPaymentDepositDialogOpened,
    onCryptoPaymentDepositDialogClose,
    onDepositSuccess: handleCryptoPaymentSuccessDialogOpen,
    setIsAccountChangedOnDepositStep,
  });

  const isLoading =
    isNativeTokenPriceLoading ||
    isAllowanceFeeLoading ||
    isDepositFeeLoading ||
    isLoadingRate ||
    isTotalAmountLoading ||
    isWalletTokenBalanceLoading;

  const { transactionStatus } = useOngoingPayments();

  const [fetchAllowance] = useLazyFetchMyAllowanceQuery();

  const handlePayButtonClick = useCallback(() => {
    const isDepositStep =
      transaction?.allowanceTransactionHash &&
      transaction?.topUpTransactionHash;

    const hasDepositError = isDepositStep && transactionStatus === 'error';
    const shouldOpenDepositDialog = isDepositStep && !hasDepositError;

    if (shouldOpenDepositDialog) {
      return handleCryptoPaymentDepositDialogOpen();
    }

    if (transactionStatus === 'success') {
      return handleCryptoPaymentSuccessDialogOpen();
    }

    fetchAllowance();

    return handleCryptoPaymentSummaryDialogOpen();
  }, [
    fetchAllowance,
    handleCryptoPaymentDepositDialogOpen,
    handleCryptoPaymentSuccessDialogOpen,
    handleCryptoPaymentSummaryDialogOpen,
    transaction?.allowanceTransactionHash,
    transaction?.topUpTransactionHash,
    transactionStatus,
  ]);

  return {
    cryptoPaymentDepositDialogProps: cryptoDepositDialogProps,
    cryptoPaymentSuccessDialogProps,
    cryptoPaymentSummaryProps,
    handlePayButtonClick,
    isLoading,
  };
};
