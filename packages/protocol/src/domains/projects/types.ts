import { Chain as MainChainType, ChainType } from '../chains/types';

export enum NewProjectStep {
  Chain,
  Whitelist,
  Plan,
  Checkout,
}

export enum PlanName {
  EarlyAdopters = 'Early Adopters',
  Grow = 'Grow',
}

export interface Plan {
  name: PlanName;
  title: string;
  price: string;
  description: string;
  USDPrice: string;
  disabled?: boolean;
}

export enum WhiteListItem {
  ip = 'ip',
  referer = 'referer',
  address = 'address',
  all = 'all',
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
