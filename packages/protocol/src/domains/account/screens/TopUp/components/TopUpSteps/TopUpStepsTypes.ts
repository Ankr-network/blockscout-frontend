import { TopUpStep } from 'modules/auth/actions/fetchTopUpStatus';

interface CommonProps {
  step: TopUpStep;
  onDeposit: () => void;
  onConnect: () => void;
  loading: boolean;
}

export interface ITopUpStepsProps extends CommonProps {
  amount: number;
}

export interface IGetButtonPropsParams extends CommonProps {}
