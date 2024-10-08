import { Chain, ChainType } from '@ankr.com/chains-list';

export enum NewProjectStep {
  General,
  Chains,
  Whitelist,
}

export enum ProjectChainTypeExtenders {
  BeaconMainnet = 'beaconMainnet',
  BeaconTestnet = 'BeaconTestnet',
  OpnodeMainnet = 'OpnodeMainnet',
  OpnodeTestnet = 'OpnodeTestnet',
}

export type ProjectChainType = ChainType | ProjectChainTypeExtenders;

export type ProjectChainsType = Chain & {
  beaconsMainnet?: Chain[];
  beaconsTestnet?: Chain[];
  opnodesMainnet?: Chain[];
  opnodesTestnet?: Chain[];
};

export type ProjectChain = ProjectChainsType & {
  mainnets?: Chain[];
};
