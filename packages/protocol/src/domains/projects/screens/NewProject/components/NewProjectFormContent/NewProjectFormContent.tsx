import { Dispatch, SetStateAction } from 'react';

import { NewProjectStep } from 'domains/projects/types';

import { ChainStep } from '../ChainStep';
import { CheckoutStep } from '../CheckoutStep';
import { WhitelistStep } from '../WhitelistStep';
import { PlanStep } from '../PlanStep';

interface NewProjectFormContentProps {
  step: NewProjectStep;
  setCurrentStep: Dispatch<SetStateAction<NewProjectStep>>;
}

export const NewProjectFormContent = ({
  step,
  setCurrentStep,
}: NewProjectFormContentProps) => {
  switch (step) {
    case NewProjectStep.Chain:
    default:
      return <ChainStep />;

    case NewProjectStep.Whitelist:
      return <WhitelistStep />;

    case NewProjectStep.Plan:
      return <PlanStep />;

    case NewProjectStep.Checkout:
      return <CheckoutStep setCurrentStep={setCurrentStep} />;
  }
};
