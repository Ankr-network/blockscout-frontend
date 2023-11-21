import { ChainID } from 'modules/chains/types';

export const isChainHasSingleOptionToSelect = (chainId: ChainID) => {
  return chainId === ChainID.TENET;
};
