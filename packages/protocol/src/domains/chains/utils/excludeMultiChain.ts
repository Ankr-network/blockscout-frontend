import { ChainID } from 'modules/chains/types';
import { Chain } from '../types';

export const excludeMultiChain = (chains: Chain[]): Chain[] => {
  return chains.filter(chain => chain.id !== ChainID.MULTICHAIN);
};
