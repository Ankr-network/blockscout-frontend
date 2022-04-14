import { AccountRoutesConfig } from 'domains/account/Routes';
import { useState, useCallback } from 'react';
import { useHistory } from 'react-router';
import { TopUpStepsContainer as TopUpSteps } from './components/TopUpSteps/TopUpStepsContainer';
import { useTopUpBreadcrumbs } from './TopUpUtils';

const AMOUNT = 1000000;
const STEP = 0;

export const TopUp = () => {
  const history = useHistory();
  const [step, setStep] = useState(STEP);

  useTopUpBreadcrumbs();

  const onDeposit = useCallback(() => {
    setStep(oldStep => {
      if (oldStep === 5) {
        const link = AccountRoutesConfig.accountDetails.generatePath();

        history.push(link);

        return STEP;
      }

      return ++oldStep;
    });
  }, [history]);

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
