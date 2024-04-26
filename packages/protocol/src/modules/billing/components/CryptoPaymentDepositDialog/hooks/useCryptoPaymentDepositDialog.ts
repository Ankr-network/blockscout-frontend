import { useMemo } from 'react';

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
import { getErroredStep } from '../utils/getErroredStep';
import { getStatus } from '../utils/getStatus';
import { isPending } from '../utils/isPending';
import { useCloseDialogHandler } from './useCloseDialogHandler';
import { useConfirmButtonClickHandler } from './useConfirmButtonClickHandler';

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
  sendAllowanceError: approvalError,
  step,
}: IUseCryptoPaymentDepositDialogProps): ICryptoPaymentDepositDialogProps => {
  const { myAllowance, isLoading: isMyAllowanceLoading } = useMyAllowance({
    skipFetching: !isCryptoPaymentDepositDialogOpened,
  });

  const isAllowanceSent = useAppSelector(selectIsAllowanceSent);

  const { amountToDeposit, handleResetAllowance, transactionCurrency } =
    useTopUp();

  const {
    isOngoingPaymentError,
    isOngoingPaymentPending,
    shouldShowOngoingPayment: hasOngoingTransaction,
  } = useOngoingPayments();

  const { onClose } = useCloseDialogHandler({
    handleRejectAllowance,
    handleResetAllowance,
    isOngoingPaymentError,
    isOngoingPaymentPending,
    onCryptoPaymentDepositDialogClose,
  });

  const { onConfirmButtonClick } = useConfirmButtonClickHandler({
    approvalError,
    approvalStatus,
    handleDeposit: onDeposit,
    handleSendAllowance,
  });

  return useMemo<ICryptoPaymentDepositDialogProps>(
    () => ({
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
      erroredStep: getErroredStep({ approvalStatus }),
      hasMinimizeIcon: hasOngoingTransaction && !isOngoingPaymentError,
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
      step,
      transactionCurrency,
    ],
  );
};
