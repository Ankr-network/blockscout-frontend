import { Chain } from '@ankr.com/chains-list';

import { isTestnetOnlyChain } from 'domains/chains/utils/isTestnetOnlyChain';

import { getEVMTestnet } from './getEVMTestnet';

const addEVMUrls = (chain: Chain): Chain => {
  const { testnets = [] } = chain;

  const { urls } = getEVMTestnet(testnets) || chain;

  return { ...chain, urls };
};

export const processTestnetOnlyChains = (chains: Chain[]) =>
  chains.map(chain => {
    const { id, testnets } = chain;

    return testnets && isTestnetOnlyChain(id) ? addEVMUrls(chain) : chain;
  });
