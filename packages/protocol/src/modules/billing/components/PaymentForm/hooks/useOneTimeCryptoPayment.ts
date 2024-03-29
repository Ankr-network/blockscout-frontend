import { ECurrency, ENetwork } from 'modules/billing/types';
import { useTokenPrice } from 'domains/account/hooks/useTokenPrice';

import { useCryptoPaymentSummaryDialog } from '../../CryptoPaymentSummaryDialog';
import { useEstimatedANKRDepositFeeDetails } from './useEstimatedANKRDepositFeeDetails';
import { useEstimatedANKRAllowanceFeeDetails } from './useEstimatedANKRAllowanceFeeDetails';
import { useTotalCryptoAmount } from './useTotalCryptoAmount';
import { useCryptoDepositStep } from './useCryptoDepositStep';

export interface IUseOneTimeCryptoPaymentProps {
  amount: number;
  currency: ECurrency;
  onDepositSuccess: () => void;
}

export const useOneTimeCryptoPayment = ({
  amount,
  currency,
  onDepositSuccess,
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

  const { isLoadingRate, cryptoDepositDialogProps, onGetAllowance } =
    useCryptoDepositStep({
      amount,
      currency,
      approvalFeeDetails,
      depositFeeDetails,
      onDepositSuccess,
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
    totalAmount,
    onConfirm: onGetAllowance,
  });

  const handlePayButtonClick = handleCryptoPaymentSummaryDialogOpen;

  return {
    cryptoPaymentSummaryProps,
    handlePayButtonClick,
    isLoading,

    cryptoPaymentDepositDialogProps: cryptoDepositDialogProps,
  };
};
