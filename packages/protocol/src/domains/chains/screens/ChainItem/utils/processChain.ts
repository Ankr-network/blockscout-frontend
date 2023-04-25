import { Chain } from 'domains/chains/types';

export const processChain = (chain: Chain): Chain => ({
  ...chain,
  ...chain.chainWithoutMainnet,
  id: chain.id,
});
