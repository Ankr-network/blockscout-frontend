import { EBlockchain, Web3Address } from 'multirpc-sdk';
import { useCallback, useState } from 'react';

import { ECurrency, EPaymentType } from 'modules/billing/types';
import { useDialog } from 'modules/common/hooks/useDialog';
import { useNativeTokenPrice } from 'domains/account/hooks/useNativeTokenPrice';
import { useSelectTopUpTransaction } from 'domains/account/hooks/useSelectTopUpTransaction';
import { useTopUp } from 'domains/account/hooks/useTopUp';
import { useWeb3Service } from 'domains/auth/hooks/useWeb3Service';

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
  network: EBlockchain;
  networkOptions: INetworkSelectOption[];
  oneTimeAmountProps: IOneTimeAmountProps;
  handleNetworkChange: (network: EBlockchain) => void;
  onConnectAccount: (connectedAddress: Web3Address) => void;
  onCryptoPaymentFlowClose: () => void;
}

export const useOneTimeCryptoPayment = ({
  amount,
  currency,
  network,
  onConnectAccount: onConnectAccountSuccess,
  onCryptoPaymentFlowClose,
  networkOptions,
  oneTimeAmountProps,
  handleNetworkChange,
}: IUseOneTimeCryptoPaymentProps) => {
  const [isAccountChangedOnDepositStep, setIsAccountChangedOnDepositStep] =
    useState(false);

  const { hasWeb3Service } = useWeb3Service();

  const { price, isLoading: isNativeTokenPriceLoading } = useNativeTokenPrice({
    network,
    skipFetching: !hasWeb3Service,
  });

  const {
    hasEnoughTokenBalance,
    isWalletTokenBalanceLoading,
    refetchANKRBalance,
    approvalFeeDetails,
    isAllowanceFeeLoading,
    depositFeeDetails,
    isDepositFeeLoading,
  } = useOneTimeCryptoFees({ amount, currency, network, price });

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

  const { amountToDeposit, handleResetTopUpTransaction, handleResetDeposit } =
    useTopUp();

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
    onClose: onCryptoPaymentFlowClose,
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
    isLoading:
      isNativeTokenPriceLoading ||
      isAllowanceFeeLoading ||
      isDepositFeeLoading ||
      isLoadingRate ||
      isTotalAmountLoading ||
      isWalletTokenBalanceLoading,
  };
};
