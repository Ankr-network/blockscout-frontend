import { Web3Address } from 'multirpc-sdk';

import { ECurrency, ENetwork, EPaymentType } from 'modules/billing/types';
import { useTokenPrice } from 'domains/account/hooks/useTokenPrice';
import { useSelectTopUpTransaction } from 'domains/account/hooks/useSelectTopUpTransaction';

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
  const { price, isLoading: isNativeTokenPriceLoading } = useTokenPrice();

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

  const {
    cryptoPaymentSuccessDialogProps,
    handleCryptoPaymentSuccessDialogOpen,
  } = useCryptoPaymentSuccessDialog({
    amount,
    approval: approvalFeeDetails,
    currency,
    network: ENetwork.ETH,
    paymentType: EPaymentType.OneTime,
    txHash: transaction?.topUpTransactionHash ?? '',
  });

  const { isLoadingRate, cryptoDepositDialogProps } = useCryptoDepositStep({
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
    onOpenCryptoDepositDialog: cryptoDepositDialogProps.onOpen,
    onConnectAccountSuccess,
    totalAmount,
  });

  const handlePayButtonClick = transaction
    ? cryptoDepositDialogProps.onOpen // if user has ongoing transaction, open crypto deposit dialog on "pay" button click
    : handleCryptoPaymentSummaryDialogOpen;

  return {
    cryptoPaymentDepositDialogProps: cryptoDepositDialogProps,
    cryptoPaymentSuccessDialogProps,
    cryptoPaymentSummaryProps,
    handlePayButtonClick,
    isLoading,
  };
};
