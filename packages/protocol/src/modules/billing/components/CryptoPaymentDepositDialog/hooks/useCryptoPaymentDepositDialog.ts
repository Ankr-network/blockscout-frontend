import { useCallback, useMemo } from 'react';

import {
  ECryptoDepositStep,
  ECryptoDepositStepStatus,
  ECurrency,
  ENetwork,
  IFeeDetails,
} from 'modules/billing/types';
import { selectIsAllowanceSent } from 'domains/account/store/selectors';
import { useAppSelector } from 'store/useAppSelector';
import { useMyAllowance } from 'domains/account/hooks/useMyAllowance';
import { useOngoingPayments } from 'domains/account/screens/BillingPage/components/OngoingPayments';
import { useTopUp } from 'domains/account/hooks/useTopUp';

import { ICryptoPaymentDepositDialogProps } from '../types';
import { getCompletedStep } from '../utils/getCompletedStep';
import { getStatus } from '../utils/getStatus';
import { isPending } from '../utils/isPending';

export interface IUseCryptoPaymentDepositDialogProps {
  amount: number;
  amountUsd: number;
  approvalFeeDetails: IFeeDetails;
  approvalStatus: ECryptoDepositStepStatus;
  currency: ECurrency;
  depositError?: string;
  depositFeeDetails: IFeeDetails;
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
  depositStatus,
  handleCryptoPaymentDepositDialogOpen,
  handleRejectAllowance,
  handleSendAllowance,
  isCryptoPaymentDepositDialogOpened,
  onCryptoPaymentDepositDialogClose,
  onDeposit,
  sendAllowanceError,
  step,
}: IUseCryptoPaymentDepositDialogProps): ICryptoPaymentDepositDialogProps => {
  const { myAllowance, isLoading: isMyAllowanceLoading } = useMyAllowance({
    skipFetching: !isCryptoPaymentDepositDialogOpened,
  });

  const isAllowanceSent = useAppSelector(selectIsAllowanceSent);

  const { amountToDeposit, handleResetAllowance, transactionCurrency } =
    useTopUp();

  const { shouldShowOngoingPayment: hasOngoingTransaction } =
    useOngoingPayments();

  const onClose = useCallback(() => {
    if (depositStatus !== ECryptoDepositStepStatus.Pending) {
      handleResetAllowance();
    }

    onCryptoPaymentDepositDialogClose();
  }, [depositStatus, handleResetAllowance, onCryptoPaymentDepositDialogClose]);

  return useMemo<ICryptoPaymentDepositDialogProps>(() => {
    const approvalError = sendAllowanceError;

    const getErroredStep = () => {
      if (approvalStatus === ECryptoDepositStepStatus.Error) {
        return ECryptoDepositStep.Approval;
      }

      return undefined;
    };

    const onConfirmButtonClick = () => {
      const isApprovalConfirmationStatus =
        approvalStatus === ECryptoDepositStepStatus.Confirmation;

      const hasApprovalError = Boolean(approvalError);

      if (isApprovalConfirmationStatus || hasApprovalError) {
        return handleSendAllowance();
      }

      return onDeposit();
    };

    return {
      activeStep: step,
      amount,
      amountToDeposit,
      amountUsd,
      approvalError,
      approvalFeeDetails,
      approvalStatus,
      completedStep: getCompletedStep({ approvalStatus, step }),
      currency: transactionCurrency || currency,
      depositError,
      depositFeeDetails,
      depositStatus,
      erroredStep: getErroredStep(),
      hasMinimizeIcon: hasOngoingTransaction,
      isAllowanceSent,
      isMyAllowanceLoading,
      isPending: isPending({
        approvalStatus,
        depositStatus,
        isMyAllowanceLoading,
        step,
      }),
      myAllowance,
      network: ENetwork.ETH,
      onClose,
      onConfirmButtonClick,
      onDiscardButtonClick: handleRejectAllowance,
      onOpen: handleCryptoPaymentDepositDialogOpen,
      open: isCryptoPaymentDepositDialogOpened,
      status: getStatus({ approvalStatus, depositStatus, step }),
    };
  }, [
    amount,
    amountToDeposit,
    amountUsd,
    approvalFeeDetails,
    approvalStatus,
    currency,
    depositError,
    depositFeeDetails,
    depositStatus,
    handleCryptoPaymentDepositDialogOpen,
    handleRejectAllowance,
    handleSendAllowance,
    hasOngoingTransaction,
    isAllowanceSent,
    isCryptoPaymentDepositDialogOpened,
    isMyAllowanceLoading,
    myAllowance,
    onClose,
    onDeposit,
    sendAllowanceError,
    step,
    transactionCurrency,
  ]);
};
