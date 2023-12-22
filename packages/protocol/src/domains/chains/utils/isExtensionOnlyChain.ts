import { ChainID } from 'modules/chains/types';

const extensionOnlyChain = [ChainID.SECRET, ChainID.SEI, ChainID.STELLAR];

export const isExtensionOnlyChain = (chainId: ChainID) =>
  extensionOnlyChain.includes(chainId);
