import { TopUpStep } from 'domains/account/actions/topUp/const';
import { TopUpSteps } from './components/TopUpSteps';
import { useTopupSteps } from './TopUpUtils';

interface TopUpProps {
  initialStep: TopUpStep;
}

export const TopUp = ({ initialStep }: TopUpProps) => {
  const { step, onClick, amount, loading } = useTopupSteps(initialStep);

  return (
    <TopUpSteps
      step={step}
      loading={loading}
      amount={amount}
      onClick={onClick}
    />
  );
};
