import {
  ECryptoDepositStep,
  ECryptoDepositStepStatus,
} from 'modules/payments/types';

export interface IIsPendingParams {
  allowanceStepStatus: ECryptoDepositStepStatus;
  depositStepStatus?: ECryptoDepositStepStatus;
  isAllowanceLoading: boolean;
  isNetworkSwitching?: boolean;
  step: ECryptoDepositStep;
}

export const isPending = ({
  allowanceStepStatus,
  depositStepStatus,
  isAllowanceLoading,
  isNetworkSwitching,
  step,
}: IIsPendingParams) => {
  if (isNetworkSwitching) {
    return true;
  }

  const isAllowanceStep = step === ECryptoDepositStep.Allowance;

  if (isAllowanceStep) {
    const isAllowancePending =
      allowanceStepStatus === ECryptoDepositStepStatus.Pending;

    return isAllowanceLoading || isAllowancePending;
  }

  const isDepositPending =
    depositStepStatus === ECryptoDepositStepStatus.Pending;

  return isDepositPending;
};
