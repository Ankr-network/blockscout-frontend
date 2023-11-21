import { ChainID, Chain } from 'modules/chains/types';

export const excludeMultiChain = (chain: Chain) =>
  chain.id !== ChainID.MULTICHAIN;
