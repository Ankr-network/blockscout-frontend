import { Address } from '@ankr.com/provider';

import { NewProjectStep } from '../types';

export enum ChainStepFields {
  projectName = 'projectName',
  tokenIndex = 'tokenIndex',
  chainId = 'chainId',
  subChainId = 'subChainId',
  chainName = 'chainName',
  chainType = 'chainType',
  groupId = 'groupId',
}

export enum WhitelistStepFields {
  contractAddress = 'contractAddress',
  userEndpointToken = 'userEndpointToken',
}

export enum PlanStepFields {
  planName = 'planName',
  planPrice = 'planPrice',
}

export enum CheckoutStepFields {
  isCheckedOut = 'isCheckedOut',
}

export interface NewProjectType {
  [NewProjectStep.Chain]?: {
    [ChainStepFields.projectName]?: string;
    [ChainStepFields.tokenIndex]?: number | null;
    [ChainStepFields.chainId]?: string;
    [ChainStepFields.subChainId]?: string;
    [ChainStepFields.chainName]?: string;
    [ChainStepFields.chainType]?: string;
    [ChainStepFields.groupId]?: string;
  };
  [NewProjectStep.Whitelist]?: {
    [WhitelistStepFields.contractAddress]?: string;
    [WhitelistStepFields.userEndpointToken]?: string;
  };
  [NewProjectStep.Plan]?: {
    [PlanStepFields.planName]?: string;
    [PlanStepFields.planPrice]?: string;
  };
  [NewProjectStep.Checkout]?: {
    [CheckoutStepFields.isCheckedOut]?: boolean;
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
