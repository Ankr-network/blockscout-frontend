import { IApiChain } from 'domains/chains/api/queryChains';
import { getEVMTestnet } from './getEVMTestnet';
import { isTestnetOnlyChain } from 'domains/chains/utils/isTestnetOnlyChain';

const addEVMUrls = (chain: IApiChain): IApiChain => {
  const { testnets = [] } = chain;

  const { urls } = getEVMTestnet(testnets) ?? chain;

  return { ...chain, urls };
};

export const proccessTestnetOnlyChains = (chains: IApiChain[]) =>
  chains.map(chain => {
    const { id, testnets } = chain;

    return testnets && isTestnetOnlyChain(id) ? addEVMUrls(chain) : chain;
  });
