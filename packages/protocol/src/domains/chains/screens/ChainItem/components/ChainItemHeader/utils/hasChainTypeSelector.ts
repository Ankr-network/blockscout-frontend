import { ChainID } from 'domains/chains/types';

export const hasChainTypeSelector = (chainId: ChainID) => {
  return chainId === ChainID.SCROLL;
};
