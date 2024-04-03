import { useCallback, useEffect, useMemo, useState } from 'react';
import BigNumber from 'bignumber.js';

import { useTopupInitialStep } from 'domains/account/screens/TopUp/useTopupInitialStep';
import { TopUpStep } from 'domains/account/actions/topUp/const';
import { useTopUp } from 'domains/account/hooks/useTopUp';
import { useDialog } from 'modules/common/hooks/useDialog';
import {
  ECryptoDepositStep,
  ECryptoDepositStepStatus,
  ECurrency,
  IFeeDetails,
} from 'modules/billing/types';
import { useUSDAmountByCryptoAmount } from 'modules/billing/hooks/useUSDAmountByCryptoAmount';

import { useCryptoPaymentDepositDialog } from '../../CryptoPaymentDepositDialog';

interface ICryptoDepositStep {
  currency: ECurrency;
  approvalFeeDetails: IFeeDetails;
  depositFeeDetails: IFeeDetails;
  onDepositSuccess: () => void;
}

// eslint-disable-next-line max-lines-per-function
export const useCryptoDepositStep = ({
  approvalFeeDetails,
  currency,
  depositFeeDetails,
  onDepositSuccess,
}: ICryptoDepositStep) => {
  const {
    amountToApprove,
    approvedAmount,
    handleDeposit,
    handleFetchPublicKey,
    handleGetAllowance,
    handleSetAmount,
    handleResetTopUpTransaction,

    sendAllowanceErrorMessage,
    depositErrorMessage,
  } = useTopUp();

  const {
    isOpened: isOpenedCryptoPaymentDepositDialog,
    onClose: onCloseCryptoPaymentDepositDialog,
    onOpen: handleCryptoPaymentDepositDialogOpen,
  } = useDialog();

  const handleRejectAllowance = useCallback(() => {
    handleResetTopUpTransaction();
    onCloseCryptoPaymentDepositDialog();
  }, [handleResetTopUpTransaction, onCloseCryptoPaymentDepositDialog]);

  const initialApprovalStatus = useMemo(() => {
    if (Number(approvedAmount) > 0) {
      return ECryptoDepositStepStatus.Complete;
    }

    return ECryptoDepositStepStatus.Confirmation;
  }, [approvedAmount]);

  const { initialStep } = useTopupInitialStep();

  const getInitialStep = useCallback(() => {
    if (initialApprovalStatus === ECryptoDepositStepStatus.Complete) {
      return ECryptoDepositStep.Deposit;
    }

    switch (initialStep) {
      case TopUpStep.start:
        return ECryptoDepositStep.Approval;
      case TopUpStep.allowance:
        return ECryptoDepositStep.Approval;
      case TopUpStep.deposit:
        return ECryptoDepositStep.Deposit;
      default:
        return ECryptoDepositStep.Approval;
    }
  }, [initialStep, initialApprovalStatus]);

  const [currentStep, setCurrentStep] = useState<ECryptoDepositStep>(
    getInitialStep(),
  );

  const amount = useMemo(
    () => Number(approvedAmount) || Number(amountToApprove),
    [approvedAmount, amountToApprove],
  );

  const [currentApprovalStatus, setCurrentApprovalStatus] =
    useState<ECryptoDepositStepStatus>(initialApprovalStatus);

  const [currentDepositStatus, setCurrentDepositStatus] = useState<
    ECryptoDepositStepStatus | undefined
  >(undefined);

  useEffect(() => {
    if (initialStep === TopUpStep.deposit) {
      setCurrentStep(ECryptoDepositStep.Deposit);
      setCurrentApprovalStatus(ECryptoDepositStepStatus.Complete);
    } else {
      handleSetAmount(new BigNumber(amount));
      setCurrentStep(ECryptoDepositStep.Approval);
      setCurrentApprovalStatus(ECryptoDepositStepStatus.Confirmation);
      setCurrentDepositStatus(undefined);
    }
  }, [initialStep, amount, handleSetAmount]);

  const onDeposit = useCallback(async () => {
    setCurrentDepositStatus(ECryptoDepositStepStatus.Confirmation);
    const response = await handleDeposit();

    setCurrentDepositStatus(ECryptoDepositStepStatus.Pending);

    if (response.error) {
      setCurrentDepositStatus(ECryptoDepositStepStatus.Error);
    } else {
      setCurrentDepositStatus(ECryptoDepositStepStatus.Complete);
      onCloseCryptoPaymentDepositDialog();
      onDepositSuccess();
    }
  }, [handleDeposit, onCloseCryptoPaymentDepositDialog, onDepositSuccess]);

  const { amountUsd, isLoading: isLoadingRate } = useUSDAmountByCryptoAmount({
    amount,
    currency,
  });

  const onGetAllowance = useCallback(
    async (isRetry?: boolean) => {
      await handleFetchPublicKey();

      if (isRetry) {
        handleSetAmount(new BigNumber(amount));
        setCurrentApprovalStatus(ECryptoDepositStepStatus.Confirmation);
      }

      setCurrentApprovalStatus(ECryptoDepositStepStatus.Pending);
      const response = await handleGetAllowance();

      if (response.error) {
        setCurrentApprovalStatus(ECryptoDepositStepStatus.Error);
      } else {
        setCurrentApprovalStatus(ECryptoDepositStepStatus.Complete);
        setCurrentDepositStatus(ECryptoDepositStepStatus.Confirmation);
        setCurrentStep(ECryptoDepositStep.Deposit);
      }
    },
    [handleFetchPublicKey, handleGetAllowance, handleSetAmount, amount],
  );

  const cryptoDepositDialogProps = useCryptoPaymentDepositDialog({
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
  };
};
