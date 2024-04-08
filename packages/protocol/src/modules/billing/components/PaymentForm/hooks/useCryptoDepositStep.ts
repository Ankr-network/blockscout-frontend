import { useCallback } from 'react';

import { useTopUp } from 'domains/account/hooks/useTopUp';
import { useDialog } from 'modules/common/hooks/useDialog';
import {
  ECryptoDepositStepStatus,
  ECurrency,
  IFeeDetails,
} from 'modules/billing/types';
import { useUSDAmountByCryptoAmount } from 'modules/billing/hooks/useUSDAmountByCryptoAmount';
import { useLazyFetchMyAllowanceQuery } from 'domains/account/actions/fetchMyAllowance';
import { useAppSelector } from 'store/useAppSelector';
import { selectMyAllowanceValue } from 'domains/account/store/selectors';

import { useCryptoPaymentDepositDialog } from '../../CryptoPaymentDepositDialog';
import { useOneTimeDialogState } from './useOneTimeDialogState';

interface ICryptoDepositStep {
  currency: ECurrency;
  approvalFeeDetails: IFeeDetails;
  depositFeeDetails: IFeeDetails;
  onDepositSuccess: () => void;
}

export const useCryptoDepositStep = ({
  approvalFeeDetails,
  currency,
  depositFeeDetails,
  onDepositSuccess,
}: ICryptoDepositStep) => {
  const alreadyApprovedAllowanceValue = useAppSelector(selectMyAllowanceValue);

  const {
    amountToDeposit,
    approvedAmount,
    depositErrorMessage,
    handleDeposit,
    handleGetAllowance,
    handleResetTopUpTransaction,
    handleWaitTransactionConfirming,
    sendAllowanceErrorMessage,
  } = useTopUp();

  const {
    isOpened: isOpenedCryptoPaymentDepositDialog,
    onClose: onCloseCryptoPaymentDepositDialog,
    onOpen: handleCryptoPaymentDepositDialogOpen,
  } = useDialog();

  const [fetchAllowance] = useLazyFetchMyAllowanceQuery();

  const {
    currentStep,
    currentApprovalStatus,
    currentDepositStatus,
    setCurrentApprovalStatus,
    setCurrentDepositStatus,
    moveToDeposit,
    setStartApproval,
  } = useOneTimeDialogState();

  const handleRejectAllowance = useCallback(() => {
    handleResetTopUpTransaction();
    onCloseCryptoPaymentDepositDialog();
    setStartApproval();
  }, [
    handleResetTopUpTransaction,
    onCloseCryptoPaymentDepositDialog,
    setStartApproval,
  ]);

  const onDeposit = useCallback(async () => {
    setCurrentDepositStatus(ECryptoDepositStepStatus.Confirmation);
    const depositResponse = await handleDeposit();

    setCurrentDepositStatus(ECryptoDepositStepStatus.Pending);

    const confirmationResponse = await handleWaitTransactionConfirming();

    if (depositResponse.error || confirmationResponse.error) {
      setCurrentDepositStatus(ECryptoDepositStepStatus.Error);
    } else {
      setCurrentDepositStatus(ECryptoDepositStepStatus.Complete);
      onCloseCryptoPaymentDepositDialog();
      onDepositSuccess();
    }
  }, [
    handleDeposit,
    handleWaitTransactionConfirming,
    onCloseCryptoPaymentDepositDialog,
    setCurrentDepositStatus,
    onDepositSuccess,
  ]);

  const onGetAllowance = useCallback(
    async (isRetry?: boolean) => {
      if (isRetry) {
        setCurrentApprovalStatus(ECryptoDepositStepStatus.Confirmation);
      }

      setCurrentApprovalStatus(ECryptoDepositStepStatus.Pending);
      const allowanceResponse = await handleGetAllowance();
      const allowanceValueResponse = await fetchAllowance({});

      if (allowanceResponse.error || allowanceValueResponse.error) {
        setCurrentApprovalStatus(ECryptoDepositStepStatus.Error);

        return;
      }

      const allowanceValueNumber = Number(allowanceValueResponse.data);
      const hasEnoughAllowance =
        allowanceValueNumber >= Number(amountToDeposit);

      if (hasEnoughAllowance) {
        moveToDeposit();

        return;
      }

      setStartApproval();
    },
    [
      amountToDeposit,
      fetchAllowance,
      handleGetAllowance,
      moveToDeposit,
      setCurrentApprovalStatus,
      setStartApproval,
    ],
  );

  const { amountUsd, isLoading: isLoadingRate } = useUSDAmountByCryptoAmount({
    amount: Number(amountToDeposit),
    currency,
  });

  const cryptoDepositDialogProps = useCryptoPaymentDepositDialog({
    sendAllowanceErrorMessage,
    amount: Number(amountToDeposit),
    amountUsd,
    currency,
    approvedAmount:
      Number(alreadyApprovedAllowanceValue) || Number(approvedAmount),
    approvalFeeDetails,
    currentApprovalStatus,
    depositFeeDetails,
    currentDepositStatus,
    depositErrorMessage,
    currentStep,
    onDeposit,
    onGetAllowance,
    handleRejectAllowance,
    isOpenedCryptoPaymentDepositDialog,
    onCloseCryptoPaymentDepositDialog,
    handleCryptoPaymentDepositDialogOpen,
  });

  return {
    isLoadingRate,
    cryptoDepositDialogProps,
    handleCryptoPaymentDepositDialogOpen,
  };
};
