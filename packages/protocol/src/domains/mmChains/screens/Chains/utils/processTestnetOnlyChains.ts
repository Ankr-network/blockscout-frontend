import { getEVMTestnet } from './getEVMTestnet';
import { isTestnetOnlyChain } from 'domains/chains/utils/isTestnetOnlyChain';
import { Chain } from 'domains/chains/types';

const addEVMUrls = (chain: Chain): Chain => {
  const { testnets = [] } = chain;

  const { urls } = getEVMTestnet(testnets) ?? chain;

  return { ...chain, urls };
};

export const proccessTestnetOnlyChains = (chains: Chain[]) =>
  chains.map(chain => {
    const { id, testnets } = chain;

    return testnets && isTestnetOnlyChain(id) ? addEVMUrls(chain) : chain;
  });
