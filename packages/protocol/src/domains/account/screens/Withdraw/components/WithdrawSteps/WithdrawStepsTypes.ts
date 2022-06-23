import { WithdrawStep } from 'domains/account/actions/withdraw/const';

export interface IWithdrawStepsProps {
  step: WithdrawStep;
  onConfirm: () => void;
  loading: boolean;
  withdrawalTransactionHash?: string;
  hasError: boolean;
}
