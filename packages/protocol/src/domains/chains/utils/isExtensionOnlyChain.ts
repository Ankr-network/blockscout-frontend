import { ChainID } from 'modules/chains/types';

const extensionOnlyChain: ChainID[] = [
  ChainID.SECRET,
  ChainID.SEI,
  ChainID.STELLAR,
  ChainID.KAVA,
];

export const isExtensionOnlyChain = (chainId: ChainID) =>
  extensionOnlyChain.includes(chainId);
