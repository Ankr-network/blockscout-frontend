import { TopUpStep } from 'domains/account/actions/topUp/const';
import { TopUpSteps } from './components/TopUpSteps';
import { useTopupSteps } from './TopUpUtils';

interface TopUpProps {
  initialStep: TopUpStep;
}

export const TopUp = ({ initialStep }: TopUpProps) => {
  const { step, onClick, amount, loading, hasError } =
    useTopupSteps(initialStep);

  return (
    <TopUpSteps
      step={step}
      loading={loading}
      hasError={hasError}
      amount={amount}
      onClick={onClick}
    />
  );
};
