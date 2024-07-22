import { Chain as MainChainType, ChainType } from 'modules/chains/types';

export enum NewProjectStep {
  General,
  Chains,
  Whitelist,
}

export enum PlanName {
  EarlyAdopters = 'Early Adopters',
  Grow = 'Grow',
  Free = 'Free',
}

export interface Plan {
  name: PlanName;
  title: string;
  price: string;
  description: string;
  USDPrice: string;
  disabled?: boolean;
}

export enum ProjectChainTypeExtenders {
  BeaconMainnet = 'beaconMainnet',
  BeaconTestnet = 'BeaconTestnet',
  OpnodeMainnet = 'OpnodeMainnet',
  OpnodeTestnet = 'OpnodeTestnet',
}

export type ProjectChainType = ChainType | ProjectChainTypeExtenders;

export type ProjectChainsType = MainChainType & {
  beaconsMainnet?: MainChainType[];
  beaconsTestnet?: MainChainType[];
  opnodesMainnet?: MainChainType[];
  opnodesTestnet?: MainChainType[];
};

export enum ESortChainsType {
  Trending = 'trending',
  NameAZ = 'name-a-z',
  NameZA = 'name-z-a',
  UsageHighLow = 'usage-high-low',
  UsageLowHigh = 'usage-low-high',
}
