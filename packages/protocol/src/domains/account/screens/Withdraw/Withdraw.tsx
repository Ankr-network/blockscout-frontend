import { AccountRoutesConfig } from 'domains/account/Routes';
import { useState, useCallback } from 'react';
import { useHistory } from 'react-router';

import { WithdrawStepsContainer as WithdrawSteps } from './components/WithdrawSteps';
import { useWithdrawBreadcrumbs } from './WithdrawUtils';

const STEP = 0;

export const Withdraw = () => {
  const history = useHistory();
  const [step, setStep] = useState(STEP);

  useWithdrawBreadcrumbs();

  const onDeposit = useCallback(() => {
    setStep(oldStep => {
      if (oldStep === 3) {
        const link = AccountRoutesConfig.accountDetails.generatePath();

        history.push(link);

        return STEP;
      }

      return ++oldStep;
    });
  }, [history]);

  const loading = false;

  return <WithdrawSteps step={step} onDeposit={onDeposit} loading={loading} />;
};
