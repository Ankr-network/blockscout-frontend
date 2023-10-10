import { NewProjectStep } from 'domains/projects/types';

import { ChainStep } from '../ChainStep';
import { WhitelistStep } from '../WhitelistStep';
import { GeneralStep } from '../GeneralStep';

interface NewProjectFormContentProps {
  step: NewProjectStep;
}

export const NewProjectFormContent = ({ step }: NewProjectFormContentProps) => {
  switch (step) {
    case NewProjectStep.General:
    default:
      return <GeneralStep />;

    case NewProjectStep.Chains:
      return <ChainStep />;

    case NewProjectStep.Whitelist:
      return <WhitelistStep />;
  }
};
