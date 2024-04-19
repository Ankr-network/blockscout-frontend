import { useCallback, useEffect, useMemo, useState } from 'react';

import { useAppSelector } from 'store/useAppSelector';
import {
  selectMyAllowanceLoading,
  selectMyAllowanceValue,
} from 'domains/account/store/selectors';
import {
  ECryptoDepositStep,
  ECryptoDepositStepStatus,
} from 'modules/billing/types';
import { useTopUp } from 'domains/account/hooks/useTopUp';
import { useSelectTopUpTransaction } from 'domains/account/hooks/useSelectTopUpTransaction';
import { useTopupInitialStep } from 'domains/account/screens/TopUp/useTopupInitialStep';
import { TopUpStep } from 'domains/account/actions/topUp/const';

export const useOneTimeDialogState = () => {
  const isLoadingAllowanceStatus = useAppSelector(selectMyAllowanceLoading);
  const alreadyApprovedAllowanceValue = useAppSelector(selectMyAllowanceValue);

  const {
    amountToDeposit,
    loadingWaitTransactionConfirming: isAwaitingDeposit,
  } = useTopUp();

  const transaction = useSelectTopUpTransaction();
  const { initialStep, isLoading: isLoadingInitialStep } =
    useTopupInitialStep();

  const hasAllowanceInBlockchain = Number(alreadyApprovedAllowanceValue) > 0;
  const isEnoughAllowance =
    hasAllowanceInBlockchain &&
    Number(alreadyApprovedAllowanceValue) >= Number(amountToDeposit);

  const initialApprovalStatus = useMemo(() => {
    if (isEnoughAllowance) {
      return ECryptoDepositStepStatus.Complete;
    }

    return ECryptoDepositStepStatus.Confirmation;
  }, [isEnoughAllowance]);

  const [currentStep, setCurrentStep] = useState<ECryptoDepositStep>(
    ECryptoDepositStep.Approval,
  );

  const [currentApprovalStatus, setCurrentApprovalStatus] =
    useState<ECryptoDepositStepStatus>(initialApprovalStatus);

  const [currentDepositStatus, setCurrentDepositStatus] = useState<
    ECryptoDepositStepStatus | undefined
  >(undefined);

  const moveToDeposit = useCallback(() => {
    setCurrentStep(ECryptoDepositStep.Deposit);
    setCurrentApprovalStatus(ECryptoDepositStepStatus.Complete);
    setCurrentDepositStatus(ECryptoDepositStepStatus.Confirmation);
  }, []);

  const moveToAwaitingDeposit = useCallback(() => {
    setCurrentStep(ECryptoDepositStep.Deposit);
    setCurrentApprovalStatus(ECryptoDepositStepStatus.Complete);
    setCurrentDepositStatus(ECryptoDepositStepStatus.Pending);
  }, []);

  const setPendingApproval = useCallback(() => {
    setCurrentStep(ECryptoDepositStep.Approval);
    setCurrentApprovalStatus(ECryptoDepositStepStatus.Pending);
    setCurrentDepositStatus(undefined);
  }, []);

  const setStartApproval = useCallback(() => {
    setCurrentStep(ECryptoDepositStep.Approval);
    setCurrentApprovalStatus(ECryptoDepositStepStatus.Confirmation);
    setCurrentDepositStatus(undefined);
  }, []);

  useEffect(() => {
    if (isLoadingAllowanceStatus) {
      setPendingApproval();
    } else if (isAwaitingDeposit) {
      moveToAwaitingDeposit();
    } else if (isEnoughAllowance) {
      moveToDeposit();
    } else {
      setStartApproval();
    }
  }, [
    isLoadingAllowanceStatus,
    isEnoughAllowance,
    moveToDeposit,
    setPendingApproval,
    setStartApproval,
    moveToAwaitingDeposit,
    isAwaitingDeposit,
  ]);

  useEffect(() => {
    if (isLoadingInitialStep) {
      return;
    }

    const hasOngoingDepositTransaction =
      transaction?.topUpTransactionHash &&
      initialStep === TopUpStep.waitTransactionConfirming;

    /* If user has ongoing deposit transaction load we should set the initial state to pending deposit */
    if (hasOngoingDepositTransaction) {
      setCurrentStep(ECryptoDepositStep.Deposit);
      setCurrentApprovalStatus(ECryptoDepositStepStatus.Complete);
      setCurrentDepositStatus(ECryptoDepositStepStatus.Pending);
    }
  }, [initialStep, isLoadingInitialStep, transaction?.topUpTransactionHash]);

  return {
    currentStep,
    currentApprovalStatus,
    currentDepositStatus,

    setCurrentApprovalStatus,
    setCurrentDepositStatus,

    setStartApproval,
    moveToDeposit,
    moveToAwaitingDeposit,
  };
};
