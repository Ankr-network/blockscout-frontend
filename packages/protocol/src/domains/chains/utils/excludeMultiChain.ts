import { ChainID, Chain } from '@ankr.com/chains-list';

export const excludeMultiChain = (chain: Chain) =>
  chain.id !== ChainID.MULTICHAIN;
