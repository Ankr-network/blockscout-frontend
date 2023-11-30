import { ChainID } from 'modules/chains/types';

const extensionOnlyChain: ChainID[] = [ChainID.SECRET, ChainID.SEI];

export const isExtensionOnlyChain = (chainId: ChainID) =>
  extensionOnlyChain.includes(chainId);
