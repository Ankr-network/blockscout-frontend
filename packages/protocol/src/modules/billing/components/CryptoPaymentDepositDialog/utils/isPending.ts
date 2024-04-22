import {
  ECryptoDepositStep,
  ECryptoDepositStepStatus,
} from 'modules/billing/types';

export interface IIsPendingParams {
  approvalStatus: ECryptoDepositStepStatus;
  depositStatus?: ECryptoDepositStepStatus;
  isMyAllowanceLoading: boolean;
  step: ECryptoDepositStep;
}

export const isPending = ({
  approvalStatus,
  depositStatus,
  isMyAllowanceLoading,
  step,
}: IIsPendingParams) => {
  const isApprovalStep = step === ECryptoDepositStep.Approval;

  if (isApprovalStep) {
    const isApprovalPending =
      approvalStatus === ECryptoDepositStepStatus.Pending;

    return isMyAllowanceLoading || isApprovalPending;
  }

  const isDepositPending = depositStatus === ECryptoDepositStepStatus.Pending;

  return isDepositPending;
};
