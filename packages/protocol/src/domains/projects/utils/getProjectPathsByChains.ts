import { Chain } from '@ankr.com/chains-list';

import { getAllPathsByChain } from 'modules/chains/utils/getAllPathsByChain';

export const getProjectPathsByChains = (chains: Chain[]): string[] =>
  chains.flatMap(chain => getAllPathsByChain(chain));
