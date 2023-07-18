import { NewProjectStep } from 'domains/projects/types';
import {
  ChainStepFields,
  CheckoutStepFields,
  PlanStepFields,
  WhitelistStepFields,
  NewProjectType,
} from 'domains/projects/store';

export interface NewProjectFormProps {
  step: NewProjectStep;
  onSubmit: (
    step: NewProjectStep,
    stepValues: NewProjectType[NewProjectStep],
  ) => void;
  onBackClick: () => void;
  isLoading: boolean;
}

export interface NewProjectFormValues {
  [ChainStepFields.projectName]?: string;
  [ChainStepFields.tokenIndex]?: number;
  [ChainStepFields.chainId]?: string;
  [ChainStepFields.subChainId]?: string;
  [ChainStepFields.chainName]?: string;
  [ChainStepFields.chainType]?: string;
  [ChainStepFields.groupId]?: string;
  [WhitelistStepFields.contractAddress]?: string;
  [WhitelistStepFields.userEndpointToken]?: string;
  [PlanStepFields.planName]?: string;
  [PlanStepFields.planPrice]?: string;
  [CheckoutStepFields.isCheckedOut]?: boolean;
}
