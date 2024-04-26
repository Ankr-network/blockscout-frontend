import {
  ECryptoDepositStep,
  ECryptoDepositStepStatus,
} from 'modules/billing/types';

export interface IGetErroredStepParams {
  approvalStatus: ECryptoDepositStepStatus;
}

export const getErroredStep = ({ approvalStatus }: IGetErroredStepParams) => {
  if (approvalStatus === ECryptoDepositStepStatus.Error) {
    return ECryptoDepositStep.Approval;
  }

  return undefined;
};
