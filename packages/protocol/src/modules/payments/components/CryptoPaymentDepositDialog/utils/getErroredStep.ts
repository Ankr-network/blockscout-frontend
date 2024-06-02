import {
  ECryptoDepositStep,
  ECryptoDepositStepStatus,
} from 'modules/payments/types';

export interface IGetErroredStepParams {
  allowanceStepStatus: ECryptoDepositStepStatus;
}

export const getErroredStep = ({
  allowanceStepStatus,
}: IGetErroredStepParams) => {
  if (allowanceStepStatus === ECryptoDepositStepStatus.Error) {
    return ECryptoDepositStep.Allowance;
  }

  return undefined;
};
