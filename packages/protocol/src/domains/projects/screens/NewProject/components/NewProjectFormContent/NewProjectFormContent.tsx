import { NewProjectStep } from 'domains/projects/types';
import { ChainStep } from '../ChainStep';
import { CheckoutStep } from '../CheckoutStep';
import { WhitelistStep } from '../WhitelistStep';
import { PlanStep } from '../PlanStep';

interface NewProjectFormContentProps {
  step: NewProjectStep;
}

export const NewProjectFormContent = ({ step }: NewProjectFormContentProps) => {
  switch (step) {
    case NewProjectStep.Chain:
    default:
      return <ChainStep />;

    case NewProjectStep.Whitelist:
      return <WhitelistStep />;

    case NewProjectStep.Plan:
      return <PlanStep />;

    case NewProjectStep.Checkout:
      return <CheckoutStep />;
  }
};
