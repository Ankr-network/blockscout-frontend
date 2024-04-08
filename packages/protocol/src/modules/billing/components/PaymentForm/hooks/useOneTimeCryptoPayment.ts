import { Web3Address } from 'multirpc-sdk';
import { useCallback } from 'react';

import { ECurrency, ENetwork, EPaymentType } from 'modules/billing/types';
import { useHasWeb3Service } from 'domains/auth/hooks/useHasWeb3Service';
import { useLazyFetchMyAllowanceQuery } from 'domains/account/actions/fetchMyAllowance';
import { useOngoingPayments } from 'domains/account/screens/BillingPage/components/OngoingPayments/useOngoingPayments';
import { useSelectTopUpTransaction } from 'domains/account/hooks/useSelectTopUpTransaction';
import { useTokenPrice } from 'domains/account/hooks/useTokenPrice';

import { useCryptoDepositStep } from './useCryptoDepositStep';
import { useCryptoPaymentSuccessDialog } from '../../CryptoPaymentSuccessDialog';
import { useCryptoPaymentSummaryDialog } from '../../CryptoPaymentSummaryDialog';
import { useEstimatedANKRAllowanceFeeDetails } from './useEstimatedANKRAllowanceFeeDetails';
import { useEstimatedANKRDepositFeeDetails } from './useEstimatedANKRDepositFeeDetails';
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
  const { hasWeb3Service } = useHasWeb3Service();

  const { price, isLoading: isNativeTokenPriceLoading } = useTokenPrice({
    skipFetching: !hasWeb3Service,
  });

  const { approvalFeeDetails, isLoading: isAllowanceFeeLoading } =
    useEstimatedANKRAllowanceFeeDetails({ amount, price });

  const { depositFeeDetails, isLoading: isDepositFeeLoading } =
    useEstimatedANKRDepositFeeDetails({ amount, price });

  const { isLoading: isTotalAmountLoading, totalAmount } = useTotalCryptoAmount(
    {
      amount,
      approvalFeeDetails,
      currency,
      depositFeeDetails,
    },
  );

  const transaction = useSelectTopUpTransaction();
  const depositTransactionHash = transaction?.topUpTransactionHash;

  const {
    cryptoPaymentSuccessDialogProps,
    handleCryptoPaymentSuccessDialogOpen,
  } = useCryptoPaymentSuccessDialog({
    amount,
    approval: approvalFeeDetails,
    currency,
    network: ENetwork.ETH,
    paymentType: EPaymentType.OneTime,
    txHash: depositTransactionHash ?? '',
  });

  const {
    isLoadingRate,
    cryptoDepositDialogProps,
    handleCryptoPaymentDepositDialogOpen,
  } = useCryptoDepositStep({
    approvalFeeDetails,
    currency,
    depositFeeDetails,
    onDepositSuccess: handleCryptoPaymentSuccessDialogOpen,
  });

  const isLoading =
    isNativeTokenPriceLoading ||
    isAllowanceFeeLoading ||
    isDepositFeeLoading ||
    isLoadingRate ||
    isTotalAmountLoading;

  const {
    handleCryptoPaymentSummaryDialogOpen,
    cryptoPaymentSummaryDialogProps: cryptoPaymentSummaryProps,
  } = useCryptoPaymentSummaryDialog({
    amount,
    approvalFeeDetails,
    currency,
    depositFeeDetails,
    network: ENetwork.ETH,
    onClose: onCryptoPaymentFlowClose,
    onConfirmButtonClick: handleCryptoPaymentDepositDialogOpen,
    onConnectAccountSuccess,
    totalAmount,
  });

  const { shouldShowOngoingPayment: hasOngoingTransaction } =
    useOngoingPayments();

  const [fetchAllowance] = useLazyFetchMyAllowanceQuery();

  const handlePayButtonClick = useCallback(() => {
    if (depositTransactionHash) {
      return handleCryptoPaymentSuccessDialogOpen();
    }

    if (hasOngoingTransaction) {
      return handleCryptoPaymentDepositDialogOpen();
    }

    fetchAllowance();

    return handleCryptoPaymentSummaryDialogOpen();
  }, [
    depositTransactionHash,
    fetchAllowance,
    handleCryptoPaymentDepositDialogOpen,
    handleCryptoPaymentSuccessDialogOpen,
    handleCryptoPaymentSummaryDialogOpen,
    hasOngoingTransaction,
  ]);

  return {
    cryptoPaymentDepositDialogProps: cryptoDepositDialogProps,
    cryptoPaymentSuccessDialogProps,
    cryptoPaymentSummaryProps,
    handlePayButtonClick,
    isLoading,
  };
};
