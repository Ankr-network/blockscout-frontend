import { useCallback, useEffect, useMemo, useState } from 'react';

import {
  ECryptoDepositStep,
  ECryptoDepositStepStatus,
} from 'modules/billing/types';
import { TopUpStep } from 'domains/account/actions/topUp/const';
import { useMyAllowance } from 'domains/account/hooks/useMyAllowance';
import { useSelectTopUpTransaction } from 'domains/account/hooks/useSelectTopUpTransaction';
import { useTopUp } from 'domains/account/hooks/useTopUp';
import { useTopupInitialStep } from 'domains/account/screens/TopUp/useTopupInitialStep';

export const useOneTimeDialogState = () => {
  const { isLoading: isMyAllowanceLoading, myAllowance } = useMyAllowance({
    skipFetching: true,
  });

  const {
    amountToDeposit,
    loadingWaitTransactionConfirming: isAwaitingDeposit,
  } = useTopUp();

  const transaction = useSelectTopUpTransaction();
  const { initialStep, isLoading: isLoadingInitialStep } =
    useTopupInitialStep();

  const hasOngoingDepositTransaction = Boolean(
    transaction?.topUpTransactionHash &&
      (initialStep === TopUpStep.waitTransactionConfirming ||
        initialStep === TopUpStep.deposit),
  );

  const hasAllowanceInBlockchain = myAllowance > 0;
  const isEnoughAllowance =
    hasAllowanceInBlockchain && myAllowance >= amountToDeposit.toNumber();

  const initialApprovalStatus = useMemo(() => {
    if (isEnoughAllowance) {
      return ECryptoDepositStepStatus.Complete;
    }

    return ECryptoDepositStepStatus.Confirmation;
  }, [isEnoughAllowance]);

  const [step, setStep] = useState<ECryptoDepositStep>(
    ECryptoDepositStep.Approval,
  );

  const [approvalStatus, setApprovalStatus] =
    useState<ECryptoDepositStepStatus>(initialApprovalStatus);

  const [depositStatus, setDepositStatus] =
    useState<ECryptoDepositStepStatus>();

  const moveToDeposit = useCallback(() => {
    setStep(ECryptoDepositStep.Deposit);
    setApprovalStatus(ECryptoDepositStepStatus.Complete);
    setDepositStatus(ECryptoDepositStepStatus.Confirmation);
  }, []);

  const moveToAwaitingDeposit = useCallback(() => {
    setStep(ECryptoDepositStep.Deposit);
    setApprovalStatus(ECryptoDepositStepStatus.Complete);
    setDepositStatus(ECryptoDepositStepStatus.ConfirmationBlocksWaiting);
  }, []);

  const setPendingApproval = useCallback(() => {
    setStep(ECryptoDepositStep.Approval);
    setApprovalStatus(ECryptoDepositStepStatus.Pending);
    setDepositStatus(undefined);
  }, []);

  const setStartApproval = useCallback(() => {
    setStep(ECryptoDepositStep.Approval);
    setApprovalStatus(ECryptoDepositStepStatus.Confirmation);
    setDepositStatus(undefined);
  }, []);

  useEffect(() => {
    if (isMyAllowanceLoading) {
      setPendingApproval();
    } else if (isAwaitingDeposit) {
      moveToAwaitingDeposit();
    } else if (isEnoughAllowance) {
      moveToDeposit();
    } else {
      setStartApproval();
    }
  }, [
    isAwaitingDeposit,
    isEnoughAllowance,
    isMyAllowanceLoading,
    moveToAwaitingDeposit,
    moveToDeposit,
    setPendingApproval,
    setStartApproval,
  ]);

  useEffect(() => {
    if (isLoadingInitialStep) {
      return;
    }

    /* If user has ongoing deposit transaction load we should set the initial state to pending deposit */
    if (hasOngoingDepositTransaction) {
      setStep(ECryptoDepositStep.Deposit);
      setApprovalStatus(ECryptoDepositStepStatus.Complete);
      setDepositStatus(ECryptoDepositStepStatus.Pending);
    }
  }, [hasOngoingDepositTransaction, isLoadingInitialStep]);

  return {
    approvalStatus,
    depositStatus,
    moveToAwaitingDeposit,
    moveToDeposit,
    setApprovalStatus,
    setDepositStatus,
    setStartApproval,
    step,
  };
};
