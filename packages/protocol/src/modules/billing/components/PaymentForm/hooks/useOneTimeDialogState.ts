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

export const useOneTimeDialogState = () => {
  const isLoadingAllowanceStatus = useAppSelector(selectMyAllowanceLoading);
  const alreadyApprovedAllowanceValue = useAppSelector(selectMyAllowanceValue);

  const { amountToDeposit } = useTopUp();

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
  ]);

  return {
    currentStep,
    currentApprovalStatus,
    currentDepositStatus,

    setCurrentApprovalStatus,
    setCurrentDepositStatus,

    setStartApproval,
    moveToDeposit,
  };
};
