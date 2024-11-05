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
  ChainID.ZERO_G,
  ChainID.ZERO_G_NEWTON_TESTNET,
  ChainID.TON,
  ChainID.NERVOS,
  ChainID.TRON,
  ChainID.FUEL,
];

export const isExtensionOnlyChain = (chainId: ChainID) =>
  extensionOnlyChain.includes(chainId);
