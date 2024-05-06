import {
  ECryptoDepositStep,
  ECryptoDepositStepStatus,
} from 'modules/billing/types';

export interface IIsPendingParams {
  isSwitchNetworkLoading: boolean;
  approvalStatus: ECryptoDepositStepStatus;
  depositStatus?: ECryptoDepositStepStatus;
  isMyAllowanceLoading: boolean;
  step: ECryptoDepositStep;
}

export const isPending = ({
  isSwitchNetworkLoading,
  approvalStatus,
  depositStatus,
  isMyAllowanceLoading,
  step,
}: IIsPendingParams) => {
  if (isSwitchNetworkLoading) {
    return true;
  }

  const isApprovalStep = step === ECryptoDepositStep.Approval;

  if (isApprovalStep) {
    const isApprovalPending =
      approvalStatus === ECryptoDepositStepStatus.Pending;

    return isMyAllowanceLoading || isApprovalPending;
  }

  const isDepositPending = depositStatus === ECryptoDepositStepStatus.Pending;

  return isDepositPending;
};
