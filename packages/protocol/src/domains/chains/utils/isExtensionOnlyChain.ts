import { ChainID } from '@ankr.com/chains-list';

const extensionOnlyChain: ChainID[] = [
  ChainID.SECRET,
  ChainID.SEI,
  ChainID.STELLAR,
  ChainID.KAVA,
  ChainID.AVAIL,
  ChainID.ALLORA,
  ChainID.ALLORA_TESTNET,
  ChainID.BTC,
];

export const isExtensionOnlyChain = (chainId: ChainID) =>
  extensionOnlyChain.includes(chainId);
