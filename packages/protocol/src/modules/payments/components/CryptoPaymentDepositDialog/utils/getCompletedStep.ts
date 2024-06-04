import {
  ECryptoDepositStep,
  ECryptoDepositStepStatus,
} from 'modules/payments/types';

export interface IGetCompletedStepParams {
  allowanceStepStatus?: ECryptoDepositStepStatus;
  step: ECryptoDepositStep;
}

export const getCompletedStep = ({
  allowanceStepStatus,
  step,
}: IGetCompletedStepParams) => {
  const isDeposit = step === ECryptoDepositStep.Deposit;
  const isAllowanceCompleted =
    allowanceStepStatus === ECryptoDepositStepStatus.Complete;

  if (isDeposit && isAllowanceCompleted) {
    return ECryptoDepositStep.Allowance;
  }

  return undefined;
};
