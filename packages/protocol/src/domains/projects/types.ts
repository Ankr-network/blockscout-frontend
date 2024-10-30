import { BlockchainID } from 'multirpc-sdk';
import { Chain, ChainType } from '@ankr.com/chains-list';

import { JWT } from 'domains/jwtToken/store/jwtTokenManagerSlice';

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

export interface IProjectWithBlockchains
  extends Pick<JWT, 'index' | 'name' | 'userEndpointToken'> {
  blockchains: BlockchainID[];
}
