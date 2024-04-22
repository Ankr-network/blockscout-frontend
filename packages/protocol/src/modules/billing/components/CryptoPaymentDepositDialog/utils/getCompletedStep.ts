import {
  ECryptoDepositStep,
  ECryptoDepositStepStatus,
} from 'modules/billing/types';

export interface IGetCompletedStepParams {
  approvalStatus?: ECryptoDepositStepStatus;
  step: ECryptoDepositStep;
}

export const getCompletedStep = ({
  approvalStatus,
  step,
}: IGetCompletedStepParams) => {
  const isDeposit = step === ECryptoDepositStep.Deposit;
  const isApprovalCompleted =
    approvalStatus === ECryptoDepositStepStatus.Complete;

  if (isDeposit && isApprovalCompleted) {
    return ECryptoDepositStep.Approval;
  }

  return undefined;
};
