import { Chain } from 'modules/chains/types';
import { getAllPathsByChain } from 'modules/chains/utils/getAllPathsByChain';

export const getProjectPathsByChains = (chains: Chain[]): string[] =>
  chains.flatMap(chain => getAllPathsByChain(chain));
