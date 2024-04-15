import { useMemo } from 'react';

import {
  ECryptoDepositStep,
  ECryptoDepositStepStatus,
  ECurrency,
  ENetwork,
  IFeeDetails,
} from 'modules/billing/types';
import { useAppSelector } from 'store/useAppSelector';
import { selectMyAllowanceLoading } from 'domains/account/store/selectors';

import { ICryptoPaymentDepositDialogProps } from '../types';

interface IUseCryptoPaymentDepositDialogProps {
  amount: number;
  amountUsd: number;
  approvalFeeDetails: IFeeDetails;
  approvedAmount: number;
  currency: ECurrency;
  currentApprovalStatus: ECryptoDepositStepStatus;
  currentDepositStatus?: ECryptoDepositStepStatus;
  currentStep: ECryptoDepositStep;
  depositErrorMessage?: string;
  depositFeeDetails: IFeeDetails;
  handleCryptoPaymentDepositDialogOpen: () => void;
  handleRejectAllowance: () => void;
  isCryptoPaymentDepositDialogOpened: boolean;
  onCryptoPaymentDepositDialogClose: () => void;
  onDeposit: () => void;
  onGetAllowance: (isRetry?: boolean) => void;
  sendAllowanceErrorMessage?: string;
}

export const useCryptoPaymentDepositDialog = ({
  amount,
  amountUsd,
  approvalFeeDetails,
  approvedAmount,
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
}: IUseCryptoPaymentDepositDialogProps): ICryptoPaymentDepositDialogProps => {
  const isAllowanceLoading = useAppSelector(selectMyAllowanceLoading);

  return useMemo(() => {
    const approvalError = sendAllowanceErrorMessage;

    const getPendingStatus = () => {
      if (currentStep === ECryptoDepositStep.Approval) {
        return (
          isAllowanceLoading ||
          currentApprovalStatus === ECryptoDepositStepStatus.Pending
        );
      }

      return currentDepositStatus === ECryptoDepositStepStatus.Pending;
    };

    const getStatus = () => {
      if (currentStep === ECryptoDepositStep.Approval) {
        return currentApprovalStatus;
      }

      if (!currentDepositStatus) {
        return currentApprovalStatus;
      }

      return currentDepositStatus;
    };

    const getCompletedStep = () => {
      if (
        currentStep === ECryptoDepositStep.Deposit &&
        currentApprovalStatus === ECryptoDepositStepStatus.Complete
      ) {
        return ECryptoDepositStep.Approval;
      }

      return undefined;
    };

    const getErroredStep = () => {
      if (currentApprovalStatus === ECryptoDepositStepStatus.Error) {
        return ECryptoDepositStep.Approval;
      }

      return undefined;
    };

    const onConfirmButtonClick = () => {
      if (currentApprovalStatus === ECryptoDepositStepStatus.Confirmation) {
        return onGetAllowance();
      }

      if (approvalError) {
        return onGetAllowance(true);
      }

      return onDeposit();
    };

    return {
      amount,
      amountUsd,
      currency,
      network: ENetwork.ETH,

      approvedAmount,
      approvalFeeDetails,
      approvalStatus: currentApprovalStatus,
      approvalError: approvalError as string,
      depositFeeDetails,
      depositStatus: currentDepositStatus,
      depositError: depositErrorMessage as string,

      activeStep: currentStep,
      isPending: getPendingStatus(),
      onConfirmButtonClick,
      onDiscardButtonClick: handleRejectAllowance,
      status: getStatus(),
      completedStep: getCompletedStep(),
      erroredStep: getErroredStep(),

      open: isCryptoPaymentDepositDialogOpened,
      onClose: onCryptoPaymentDepositDialogClose,
      onOpen: handleCryptoPaymentDepositDialogOpen,
    };
  }, [
    amount,
    amountUsd,
    approvalFeeDetails,
    approvedAmount,
    currency,
    currentApprovalStatus,
    currentDepositStatus,
    currentStep,
    depositErrorMessage,
    depositFeeDetails,
    handleCryptoPaymentDepositDialogOpen,
    handleRejectAllowance,
    isAllowanceLoading,
    isCryptoPaymentDepositDialogOpened,
    onCryptoPaymentDepositDialogClose,
    onDeposit,
    onGetAllowance,
    sendAllowanceErrorMessage,
  ]);
};
