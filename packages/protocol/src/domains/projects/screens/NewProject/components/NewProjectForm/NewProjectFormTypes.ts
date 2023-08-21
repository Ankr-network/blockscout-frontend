import { Dispatch, SetStateAction } from 'react';

import { NewProjectStep } from 'domains/projects/types';
import {
  ChainStepFields,
  CheckoutStepFields,
  PlanStepFields,
  WhitelistStepFields,
  NewProjectType,
  AddToWhitelistFormData,
} from 'domains/projects/store';

export interface NewProjectFormProps {
  step: NewProjectStep;
  setCurrentStep: Dispatch<SetStateAction<NewProjectStep>>;
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
  [ChainStepFields.selectedMainnetIds]?: string[];
  [ChainStepFields.selectedTestnetIds]?: string[];
  [ChainStepFields.selectedDevnetIds]?: string[];
  [WhitelistStepFields.userEndpointToken]?: string;
  [WhitelistStepFields.whitelistDialog]?: AddToWhitelistFormData;
  [WhitelistStepFields.whitelistItems]?: AddToWhitelistFormData[];
  [WhitelistStepFields.isEditingWhitelistDialog]?: boolean;
  [WhitelistStepFields.shouldSkipFormReset]?: boolean;
  [WhitelistStepFields.indexOfEditingWhitelistItem]?: number;
  [PlanStepFields.planName]?: string;
  [PlanStepFields.planPrice]?: string;
  [CheckoutStepFields.isCheckedOut]?: boolean;
}
