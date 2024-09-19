import { ChainID } from '@ankr.com/chains-list';

const testnetOnlyChains: ChainID[] = [
  ChainID.ZETACHAIN,
  ChainID.BERACHAIN,
  ChainID.TAIKO,
];

export const isTestnetOnlyChain = (chainID: ChainID) =>
  testnetOnlyChains.includes(chainID);
