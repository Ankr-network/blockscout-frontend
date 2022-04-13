import { useState } from 'react';
import { TopUpStepsContainer as TopUpSteps } from './components/TopUpSteps/TopUpStepsContainer';
import { useTopUpBreadcrumbs } from './TopUpUtils';

const AMOUNT = 1000000;
const STEP = 0;

export const TopUp = () => {
  const [step, setStep] = useState(STEP);

  useTopUpBreadcrumbs();

  const onDeposit = () => {
    setStep(oldStep => ++oldStep);
  };
  const onConnect = () => null;
  const loading = false;

  return (
    <TopUpSteps
      step={step}
      onDeposit={onDeposit}
      onConnect={onConnect}
      loading={loading}
      amount={AMOUNT}
    />
  );
};
