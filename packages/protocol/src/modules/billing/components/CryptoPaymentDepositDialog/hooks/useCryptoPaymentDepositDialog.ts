import { useMemo } from 'react';
import { EBlockchain } from 'multirpc-sdk';

import {
  ECryptoDepositStep,
  ECryptoDepositStepStatus,
  ECurrency,
  IFeeDetails,
} from 'modules/billing/types';

import { ICryptoPaymentDepositDialogProps } from '../types';
import { getCompletedStep } from '../utils/getCompletedStep';
import { getErroredStep } from '../utils/getErroredStep';
import { getStatus } from '../utils/getStatus';
import { isPending } from '../utils/isPending';
import { useCryptoPaymentDepositDialogProps } from './useCryptoPaymentDepositDialogProps';
import { useConfirmButtonClickHandler } from './useConfirmButtonClickHandler';

export interface IUseCryptoPaymentDepositDialogProps {
  amount: number;
  amountUsd: number;
  approvalFeeDetails: IFeeDetails;
  approvalStatus: ECryptoDepositStepStatus;
  currency: ECurrency;
  depositError?: string;
  depositFeeDetails: IFeeDetails;
  network: EBlockchain;
  depositStatus?: ECryptoDepositStepStatus;
  handleCryptoPaymentDepositDialogOpen: () => void;
  handleRejectAllowance: () => void;
  handleSendAllowance: () => void;
  isCryptoPaymentDepositDialogOpened: boolean;
  onCryptoPaymentDepositDialogClose: () => void;
  onDeposit: () => void;
  sendAllowanceError?: string;
  step: ECryptoDepositStep;
}

export const useCryptoPaymentDepositDialog = ({
  amount,
  amountUsd,
  approvalFeeDetails,
  approvalStatus,
  currency,
  depositError,
  depositFeeDetails,
  network,
  depositStatus,
  handleCryptoPaymentDepositDialogOpen,
  handleRejectAllowance,
  handleSendAllowance,
  isCryptoPaymentDepositDialogOpened,
  onCryptoPaymentDepositDialogClose,
  onDeposit,
  sendAllowanceError: approvalError,
  step,
}: IUseCryptoPaymentDepositDialogProps): ICryptoPaymentDepositDialogProps => {
  const {
    myAllowance,
    isMyAllowanceLoading,
    isWrongNetwork,
    shouldRevokeApproval,
    handleSwitchNetwork,
    isSwitchNetworkLoading,
    isAllowanceSent,
    isOngoingPaymentError,
    amountToDeposit,
    transactionCurrency,
    hasOngoingTransaction,
    onClose,
    onCheckApproval,
  } = useCryptoPaymentDepositDialogProps({
    currency,
    network,
    depositStatus,
    isCryptoPaymentDepositDialogOpened,
    onCryptoPaymentDepositDialogClose,
  });

  const { onConfirmButtonClick } = useConfirmButtonClickHandler({
    approvalError,
    approvalStatus,
    network,
    isWrongNetwork,
    handleSwitchNetwork,
    handleDeposit: onDeposit,
    handleSendAllowance,
  });

  return useMemo<ICryptoPaymentDepositDialogProps>(
    () => ({
      activeStep: step,
      amount,
      amountToDeposit,
      amountUsd,
      network,
      isWrongNetwork,
      shouldRevokeApproval,
      approvalError,
      approvalFeeDetails,
      approvalStatus,
      completedStep: getCompletedStep({ approvalStatus, step }),
      currency: transactionCurrency || currency,
      depositError,
      depositFeeDetails,
      depositStatus,
      erroredStep: getErroredStep({ approvalStatus }),
      hasMinimizeIcon: hasOngoingTransaction && !isOngoingPaymentError,
      isAllowanceSent,
      isMyAllowanceLoading,
      isPending: isPending({
        isSwitchNetworkLoading,
        approvalStatus,
        depositStatus,
        isMyAllowanceLoading,
        step,
      }),
      isRevokeApprovalLoading: isMyAllowanceLoading,
      myAllowance,
      onClose,
      onConfirmButtonClick,
      onDiscardButtonClick: handleRejectAllowance,
      onCheckApproval,
      onOpen: handleCryptoPaymentDepositDialogOpen,
      open: isCryptoPaymentDepositDialogOpened,
      status: getStatus({ approvalStatus, depositStatus, step }),
    }),
    [
      amount,
      amountToDeposit,
      amountUsd,
      approvalError,
      approvalFeeDetails,
      approvalStatus,
      currency,
      depositError,
      depositFeeDetails,
      depositStatus,
      handleCryptoPaymentDepositDialogOpen,
      handleRejectAllowance,
      hasOngoingTransaction,
      isAllowanceSent,
      isCryptoPaymentDepositDialogOpened,
      isMyAllowanceLoading,
      isOngoingPaymentError,
      myAllowance,
      onClose,
      onConfirmButtonClick,
      onCheckApproval,
      step,
      transactionCurrency,
      isSwitchNetworkLoading,
      isWrongNetwork,
      network,
      shouldRevokeApproval,
    ],
  );
};
