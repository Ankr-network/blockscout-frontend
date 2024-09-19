import { ChainID } from '@ankr.com/chains-list';

import { NewProjectStep } from 'domains/projects/types';
import {
  ChainStepFields,
  CheckoutStepFields,
  PlanStepFields,
  WhitelistStepFields,
  NewProjectType,
  AddToWhitelistFormData,
  GeneralStepFields,
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
  [GeneralStepFields.name]?: string;
  [GeneralStepFields.description]?: string;
  [GeneralStepFields.tokenIndex]?: number;
  [GeneralStepFields.userEndpointToken]?: string;
  [ChainStepFields.projectName]?: string;
  [ChainStepFields.isSelectedAll]?: boolean;
  [ChainStepFields.selectedMainnetIds]?: ChainID[];
  [ChainStepFields.selectedTestnetIds]?: ChainID[];
  [ChainStepFields.selectedDevnetIds]?: ChainID[];
  [ChainStepFields.selectedBeaconMainnetIds]?: ChainID[];
  [ChainStepFields.selectedBeaconTestnetIds]?: ChainID[];
  [ChainStepFields.selectedOpnodeMainnetIds]?: ChainID[];
  [ChainStepFields.selectedOpnodeTestnetIds]?: ChainID[];
  [WhitelistStepFields.whitelistDialog]?: AddToWhitelistFormData;
  [WhitelistStepFields.whitelistItems]?: AddToWhitelistFormData[];
  [WhitelistStepFields.isEditingWhitelistDialog]?: boolean;
  [WhitelistStepFields.shouldSkipFormReset]?: boolean;
  [WhitelistStepFields.indexOfEditingWhitelistItem]?: number;
  [PlanStepFields.planName]?: string;
  [PlanStepFields.planPrice]?: string;
  [CheckoutStepFields.isCheckedOut]?: boolean;
}
