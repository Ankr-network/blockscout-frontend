import { useMemo } from 'react';
import BigNumber from 'bignumber.js';

import {
  ECryptoDepositStep,
  ECryptoDepositStepStatus,
  ECurrency,
  ENetwork,
  IFeeDetails,
} from 'modules/billing/types';

import { ICryptoPaymentDepositDialogProps } from '../types';

interface IUseCryptoPaymentDepositDialogProps {
  amount: number;
  amountUsd: number;
  currency: ECurrency;
  approvedAmount: BigNumber;
  approvalFeeDetails: IFeeDetails;
  currentApprovalStatus: ECryptoDepositStepStatus;
  sendAllowanceErrorMessage?: string;
  depositFeeDetails: IFeeDetails;
  currentDepositStatus?: ECryptoDepositStepStatus;
  depositErrorMessage?: string;
  currentStep: ECryptoDepositStep;
  onDeposit: () => void;
  onGetAllowance: (isRetry?: boolean) => void;
  handleRejectAllowance: () => void;
  isOpenedCryptoPaymentDepositDialog: boolean;
  onCloseCryptoPaymentDepositDialog: () => void;
  handleCryptoPaymentDepositDialogOpen: () => void;
}

export const useCryptoPaymentDepositDialog = ({
  amount,
  amountUsd,
  currency,
  approvedAmount,
  approvalFeeDetails,
  currentApprovalStatus,
  sendAllowanceErrorMessage,
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
}: IUseCryptoPaymentDepositDialogProps): ICryptoPaymentDepositDialogProps => {
  return useMemo(() => {
    const approvalError = sendAllowanceErrorMessage;

    const getPendingStatus = () => {
      if (currentStep === ECryptoDepositStep.Approval) {
        return currentApprovalStatus === ECryptoDepositStepStatus.Pending;
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

      approvedAmount: approvedAmount.toNumber(),
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

      open: isOpenedCryptoPaymentDepositDialog,
      onClose: onCloseCryptoPaymentDepositDialog,
      onOpen: handleCryptoPaymentDepositDialogOpen,
    };
  }, [
    sendAllowanceErrorMessage,
    amount,
    amountUsd,
    currency,
    approvedAmount,
    approvalFeeDetails,
    currentApprovalStatus,
    depositFeeDetails,
    currentDepositStatus,
    depositErrorMessage,
    currentStep,
    handleRejectAllowance,
    isOpenedCryptoPaymentDepositDialog,
    onCloseCryptoPaymentDepositDialog,
    handleCryptoPaymentDepositDialogOpen,
    onGetAllowance,
    onDeposit,
  ]);
};
