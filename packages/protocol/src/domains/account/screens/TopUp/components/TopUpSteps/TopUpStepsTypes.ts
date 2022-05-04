import { TopUpStep } from 'domains/account/actions/topUp/const';

export interface ITopUpStepsProps {
  step: TopUpStep;
  onClick: () => void;
  loading: boolean;
  amount: number;
  hasCredentials: boolean;
  onReject: () => void;
  isRejectAllowanceLoading: boolean;
}
