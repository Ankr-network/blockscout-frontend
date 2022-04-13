import React from 'react';

import { TopUpSteps } from './TopUpSteps';
import { ITopUpStepsProps } from './TopUpStepsTypes';
import { getButtonProps } from './TopUpStepsUtils';

export const TopUpStepsContainer = ({
  step,
  onDeposit,
  onConnect,
  loading,
  amount,
}: ITopUpStepsProps) => {
  const { disabled, onClick: onNextStepClick } = getButtonProps({
    step,
    onDeposit,
    onConnect,
    loading,
  });

  return (
    <TopUpSteps
      step={step}
      onClick={onNextStepClick}
      disabled={disabled}
      amount={amount}
    />
  );
};
