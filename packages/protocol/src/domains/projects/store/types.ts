import { Address } from '@ankr.com/provider';
import { UserEndpointTokenMode } from 'multirpc-sdk';
import { ChainID } from '@ankr.com/chains-list';

import { NewProjectStep } from '../types';

export enum GeneralStepFields {
  name = 'name',
  description = 'description',
  tokenIndex = 'tokenIndex',
  userEndpointToken = 'userEndpointToken',
}

export enum ChainStepFields {
  projectName = 'projectName',
  isSelectedAll = 'isSelectedAll',
  selectedMainnetIds = 'selectedMainnetIds',
  selectedTestnetIds = 'selectedTestnetIds',
  selectedDevnetIds = 'selectedDevnetIds',
  selectedBeaconMainnetIds = 'selectedBeaconMainnetIds',
  selectedBeaconTestnetIds = 'selectedBeaconTestnetIds',
  selectedOpnodeMainnetIds = 'selectedOpnodeMainnetIds',
  selectedOpnodeTestnetIds = 'selectedOpnodeTestnetIds',
}

export enum WhitelistStepFields {
  whitelistItems = 'whitelistItems',
  whitelistDialog = 'whitelistDialog',
  shouldSkipFormReset = 'shouldSkipFormReset',
  indexOfEditingWhitelistItem = 'indexOfEditingWhitelistItem',
  isEditingWhitelistDialog = 'isEditingWhitelistDialog',
  isCheckedOut = 'isCheckedOut',
}

export enum PlanStepFields {
  planName = 'planName',
  planPrice = 'planPrice',
}

export enum CheckoutStepFields {
  isCheckedOut = 'isCheckedOut',
}

export interface AddToWhitelistFormData {
  type: UserEndpointTokenMode;
  value: string;
  chains: ChainID[];
}

export interface NewProjectType {
  [NewProjectStep.General]?: {
    [GeneralStepFields.name]?: string;
    [GeneralStepFields.description]?: string;
    [GeneralStepFields.userEndpointToken]?: string;
    [GeneralStepFields.tokenIndex]?: number | null;
  };
  [NewProjectStep.Chains]?: {
    [ChainStepFields.projectName]?: string;
    [ChainStepFields.isSelectedAll]?: boolean;
    [ChainStepFields.selectedMainnetIds]?: string[];
    [ChainStepFields.selectedTestnetIds]?: string[];
    [ChainStepFields.selectedDevnetIds]?: string[];
    [ChainStepFields.selectedBeaconMainnetIds]: string[];
    [ChainStepFields.selectedBeaconTestnetIds]: string[];
    [ChainStepFields.selectedOpnodeMainnetIds]: string[];
    [ChainStepFields.selectedOpnodeTestnetIds]: string[];
  };
  [NewProjectStep.Whitelist]?: {
    [WhitelistStepFields.whitelistItems]?: AddToWhitelistFormData[];
    [WhitelistStepFields.whitelistDialog]?: AddToWhitelistFormData;
    [WhitelistStepFields.isEditingWhitelistDialog]?: boolean;
    [WhitelistStepFields.shouldSkipFormReset]?: boolean;
    [WhitelistStepFields.indexOfEditingWhitelistItem]?: number;
    [WhitelistStepFields.isCheckedOut]?: boolean;
  };
}

export interface BaseNewProject {
  step: NewProjectStep;
}

export interface NewProjectConfig extends BaseNewProject {
  project: NewProjectType;
}

export interface NewProjectConfigPayload extends BaseNewProject {
  address: string;
  projectStepConfig: NewProjectType[NewProjectStep];
  nextStep: NewProjectStep;
}

export type NewProjectSlice = Record<Address, NewProjectConfig>;

export interface ProjectActivity {
  hasData: boolean;
  isEmpty: boolean;
  totalRequestsCount: number;
  relativeChange?: number;
}
