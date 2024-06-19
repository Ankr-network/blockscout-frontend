import {
  ECryptoDepositStep,
  ECryptoDepositStepStatus,
} from 'modules/payments/types';

export interface IGetCompletedStepsParams {
  allowanceStepStatus?: ECryptoDepositStepStatus;
  depositStepStatus?: ECryptoDepositStepStatus;
  step: ECryptoDepositStep;
}

export const getCompletedSteps = ({
  allowanceStepStatus,
  depositStepStatus,
  step,
}: IGetCompletedStepsParams) => {
  const isDeposit = step === ECryptoDepositStep.Deposit;

  if (isDeposit) {
    const completedSteps = [];

    const isAllowanceCompleted =
      allowanceStepStatus === ECryptoDepositStepStatus.Complete;

    if (isAllowanceCompleted) {
      completedSteps.push(ECryptoDepositStep.Allowance);
    }

    const isDepositCompleted =
      depositStepStatus === ECryptoDepositStepStatus.Complete;
    const isDepositConfirming =
      depositStepStatus === ECryptoDepositStepStatus.Confirming;

    if (isDepositCompleted || isDepositConfirming) {
      completedSteps.push(ECryptoDepositStep.Deposit);
    }

    return completedSteps;
  }

  return [];
};
