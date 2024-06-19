import { ECryptoDepositStep } from 'modules/payments/types';

export interface IStep {
  inlKey: string;
  step: ECryptoDepositStep;
}

export const steps: IStep[] = [
  {
    inlKey: 'account.payment-flow.steps.approval.title',
    step: ECryptoDepositStep.Allowance,
  },
  {
    inlKey: 'account.payment-flow.steps.deposit.title',
    step: ECryptoDepositStep.Deposit,
  },
];
