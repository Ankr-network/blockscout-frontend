import {
  ECryptoDepositStep,
  ECryptoDepositStepStatus,
} from 'modules/billing/types';

export interface IGetStatusParams {
  approvalStatus: ECryptoDepositStepStatus;
  depositStatus?: ECryptoDepositStepStatus;
  step: ECryptoDepositStep;
}

export const getStatus = ({
  approvalStatus,
  depositStatus,
  step,
}: IGetStatusParams) => {
  if (step === ECryptoDepositStep.Approval || !depositStatus) {
    return approvalStatus;
  }

  return depositStatus;
};
