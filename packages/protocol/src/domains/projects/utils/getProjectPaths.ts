import { BlockchainID } from 'multirpc-sdk';
import { Chain } from '@ankr.com/chains-list';

import { getProjectPathsByChains } from './getProjectPathsByChains';

export interface ProjectPathsParams {
  chains: Chain[];
  projectBlockchains: BlockchainID[];
}

export const getProjectPaths = ({
  chains,
  projectBlockchains = [],
}: ProjectPathsParams) => {
  const hasProjectBlockchains = projectBlockchains.length > 0;

  if (hasProjectBlockchains) {
    return projectBlockchains;
  }

  return getProjectPathsByChains(chains);
};
