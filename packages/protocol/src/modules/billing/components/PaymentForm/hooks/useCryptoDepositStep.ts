import { Dispatch, SetStateAction, useCallback } from 'react';

import { ECurrency, IFeeDetails } from 'modules/billing/types';
import { selectMyAllowanceValue } from 'domains/account/store/selectors';
import { useAppSelector } from 'store/useAppSelector';
import { useTopUp } from 'domains/account/hooks/useTopUp';
import { useUSDAmountByCryptoAmount } from 'modules/billing/hooks/useUSDAmountByCryptoAmount';

import { useCryptoPaymentDepositDialog } from '../../CryptoPaymentDepositDialog';
import { useOneTimeGetAllowanceHandler } from './useOneTimeGetAllowanceHandler';
import { useOneTimeDialogState } from './useOneTimeDialogState';
import { useOneTimeDepositHandler } from './useOneTimeDepositHandler';
import { useAccountChangedHandlingOnDepositStep } from './useAccountsChangedHandlingOnDepositStep';

interface ICryptoDepositStep {
  approvalFeeDetails: IFeeDetails;
  currency: ECurrency;
  depositFeeDetails: IFeeDetails;
  handleCryptoPaymentDepositDialogOpen: () => void;
  handleCryptoPaymentSummaryDialogOpen: () => void;
  isCryptoPaymentDepositDialogOpened: boolean;
  onCryptoPaymentDepositDialogClose: () => void;
  onDepositSuccess: () => void;
  setIsAccountChangedOnDepositStep: Dispatch<SetStateAction<boolean>>;
}

export const useCryptoDepositStep = ({
  approvalFeeDetails,
  currency,
  depositFeeDetails,
  handleCryptoPaymentDepositDialogOpen,
  handleCryptoPaymentSummaryDialogOpen,
  isCryptoPaymentDepositDialogOpened,
  onCryptoPaymentDepositDialogClose,
  onDepositSuccess,
  setIsAccountChangedOnDepositStep,
}: ICryptoDepositStep) => {
  const alreadyApprovedAllowanceValue = useAppSelector(selectMyAllowanceValue);

  const {
    amountToDeposit,
    approvedAmount,
    depositErrorMessage,
    handleResetTopUpTransaction,
    sendAllowanceErrorMessage,
  } = useTopUp();

  const {
    currentStep,
    currentApprovalStatus,
    currentDepositStatus,
    setCurrentApprovalStatus,
    setCurrentDepositStatus,
    moveToDeposit,
    moveToAwaitingDeposit,
    setStartApproval,
  } = useOneTimeDialogState();

  const handleRejectAllowance = useCallback(() => {
    handleResetTopUpTransaction();
    onCryptoPaymentDepositDialogClose();
    setStartApproval();
  }, [
    handleResetTopUpTransaction,
    onCryptoPaymentDepositDialogClose,
    setStartApproval,
  ]);

  const { onDeposit } = useOneTimeDepositHandler({
    onCryptoPaymentDepositDialogClose,
    onDepositSuccess,
    setCurrentDepositStatus,
  });

  const { onGetAllowance } = useOneTimeGetAllowanceHandler({
    moveToDeposit,
    moveToAwaitingDeposit,
    setCurrentApprovalStatus,
    setStartApproval,
  });

  // to handle the case when a user has switched his account in wallet
  // during the payment flow
  useAccountChangedHandlingOnDepositStep({
    currentDepositStatus,
    currentStep,
    handleCryptoPaymentSummaryDialogOpen,
    isCryptoPaymentDepositDialogOpened,
    onCryptoPaymentDepositDialogClose,
    setIsAccountChangedOnDepositStep,
  });

  const { amountUsd, isLoading: isLoadingRate } = useUSDAmountByCryptoAmount({
    amount: Number(amountToDeposit),
    currency,
  });

  const cryptoDepositDialogProps = useCryptoPaymentDepositDialog({
    amount: Number(amountToDeposit),
    amountUsd,
    approvalFeeDetails,
    approvedAmount:
      Number(alreadyApprovedAllowanceValue) || Number(approvedAmount),
    currency,
    currentApprovalStatus,
    currentDepositStatus,
    currentStep,
    depositErrorMessage,
    depositFeeDetails,
    handleCryptoPaymentDepositDialogOpen,
    handleRejectAllowance,
    isCryptoPaymentDepositDialogOpened,
    onCryptoPaymentDepositDialogClose,
    onDeposit,
    onGetAllowance,
    sendAllowanceErrorMessage,
  });

  return {
    isLoadingRate,
    cryptoDepositDialogProps,
    handleCryptoPaymentDepositDialogOpen,
  };
};
