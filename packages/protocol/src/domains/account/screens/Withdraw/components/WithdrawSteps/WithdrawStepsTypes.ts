import { WithdrawStep } from 'domains/auth/actions/fetchWithdrawStatus';

export interface IWithdrawStepsProps {
  step: WithdrawStep;
  onDeposit: () => void;
  loading: boolean;
}

export interface IGetButtonPropsParams {
  onDeposit: () => void;
}
