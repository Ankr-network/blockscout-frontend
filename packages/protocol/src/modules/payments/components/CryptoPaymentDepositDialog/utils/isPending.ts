import {
  ECryptoDepositStep,
  ECryptoDepositStepStatus,
} from 'modules/payments/types';

export interface IIsPendingParams {
  allowanceStepStatus: ECryptoDepositStepStatus;
  depositStepStatus?: ECryptoDepositStepStatus;
  isAllowanceLoading: boolean;
  isSwitchNetworkLoading: boolean;
  step: ECryptoDepositStep;
}

export const isPending = ({
  allowanceStepStatus,
  depositStepStatus,
  isAllowanceLoading,
  isSwitchNetworkLoading,
  step,
}: IIsPendingParams) => {
  if (isSwitchNetworkLoading) {
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
