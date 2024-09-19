import { Chain } from '@ankr.com/chains-list';

import { flatChain } from './flatChain';

export const flatChains = (chains: Chain[]) => chains.flatMap(flatChain);
