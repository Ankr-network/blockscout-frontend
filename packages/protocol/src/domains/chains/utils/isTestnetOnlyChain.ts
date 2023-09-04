import { ChainID } from 'domains/chains/types';

const testnetOnlyChains: ChainID[] = [
  ChainID.SCROLL,
  ChainID.ZETACHAIN,
  ChainID.BERACHAIN,
];

export const isTestnetOnlyChain = (chainID: ChainID) =>
  testnetOnlyChains.includes(chainID);
