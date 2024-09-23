import { ChainID } from '@ankr.com/chains-list';

export const isChainHasSingleOptionToSelect = (chainId: ChainID) => {
  return chainId === ChainID.TENET;
};
