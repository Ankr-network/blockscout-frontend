import { BlockchainID, WhitelistItem } from 'multirpc-sdk';

import { Chain } from 'modules/chains/types';

import { getProjectPathsByChains } from './getProjectPathsByChains';

export interface ProjectPathsParams {
  chains: Chain[];
  projectBlockchains: BlockchainID[];
  whitelist?: WhitelistItem[];
}

export const getProjectPaths = ({
  chains,
  projectBlockchains = [],
  whitelist = [],
}: ProjectPathsParams) => {
  const hasProjectBlockchains = projectBlockchains.length > 0;

  if (hasProjectBlockchains) {
    return projectBlockchains;
  }

  const whitelistBlockchains = [
    ...new Set(whitelist.map(item => item.blockchain)),
  ];
  const hasWhitelistBlockchains = whitelistBlockchains.length > 0;

  if (hasWhitelistBlockchains) {
    return whitelistBlockchains;
  }

  return getProjectPathsByChains(chains);
};
