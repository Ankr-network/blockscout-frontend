import { ChainID } from 'modules/chains/types';
import { Chain } from '../types';

export const excludeMultiChain = (chain: Chain) =>
  chain.id !== ChainID.MULTICHAIN;
