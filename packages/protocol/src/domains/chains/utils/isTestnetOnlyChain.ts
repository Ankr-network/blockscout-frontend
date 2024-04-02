import { ChainID } from 'modules/chains/types';

const testnetOnlyChains: ChainID[] = [
  ChainID.ZETACHAIN,
  ChainID.BERACHAIN,
  ChainID.TAIKO,
  ChainID.BITLAYER,
];

export const isTestnetOnlyChain = (chainID: ChainID) =>
  testnetOnlyChains.includes(chainID);
