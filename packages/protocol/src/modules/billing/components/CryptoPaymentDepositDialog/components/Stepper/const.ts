import { ECryptoDepositStep } from 'modules/billing/types';

export interface IStep {
  inlKey: string;
  step: ECryptoDepositStep;
}

export const steps: IStep[] = [
  {
    inlKey: 'account.payment-flow.steps.approval.title',
    step: ECryptoDepositStep.Approval,
  },
  {
    inlKey: 'account.payment-flow.steps.deposit.title',
    step: ECryptoDepositStep.Deposit,
  },
];
