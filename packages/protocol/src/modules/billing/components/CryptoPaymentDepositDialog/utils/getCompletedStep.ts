import {
  ECryptoDepositStep,
  ECryptoDepositStepStatus,
} from 'modules/billing/types';

export interface IGetCompletedStepParams {
  approvalStatus?: ECryptoDepositStepStatus;
  depositStatus?: ECryptoDepositStepStatus;
  step: ECryptoDepositStep;
}

export const getCompletedStep = ({
  approvalStatus,
  depositStatus,
  step,
}: IGetCompletedStepParams) => {
  const isDeposit = step === ECryptoDepositStep.Deposit;
  const isApprovalCompleted =
    approvalStatus === ECryptoDepositStepStatus.Complete;
  const isDepositWaiting =
    depositStatus === ECryptoDepositStepStatus.ConfirmationBlocksWaiting;

  if (isDeposit && isDepositWaiting) {
    return ECryptoDepositStep.Deposit;
  }

  if (isDeposit && isApprovalCompleted) {
    return ECryptoDepositStep.Approval;
  }

  return undefined;
};
