import React from 'react';

import { WithdrawSteps } from './WithdrawSteps';
import { IWithdrawStepsProps } from './WithdrawStepsTypes';
import { getButtonProps } from './WithdrawUtils';

export const WithdrawStepsContainer = ({
  step,
  onDeposit,
}: IWithdrawStepsProps) => {
  const { disabled, onClick: onNextStepClick } = getButtonProps({
    onDeposit,
  });

  return (
    <WithdrawSteps step={step} onClick={onNextStepClick} disabled={disabled} />
  );
};
