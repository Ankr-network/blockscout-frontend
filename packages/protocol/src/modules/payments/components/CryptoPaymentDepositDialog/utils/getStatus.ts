import {
  ECryptoDepositStep,
  ECryptoDepositStepStatus,
} from 'modules/payments/types';

export interface IGetStatusParams {
  allowanceStepStatus: ECryptoDepositStepStatus;
  depositStepStatus?: ECryptoDepositStepStatus;
  step: ECryptoDepositStep;
}

export const getStatus = ({
  allowanceStepStatus,
  depositStepStatus,
  step,
}: IGetStatusParams) => {
  if (step === ECryptoDepositStep.Allowance || !depositStepStatus) {
    return allowanceStepStatus;
  }

  return depositStepStatus;
};
