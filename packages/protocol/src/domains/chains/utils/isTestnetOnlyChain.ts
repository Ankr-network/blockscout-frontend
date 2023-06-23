import { ChainID } from 'domains/chains/types';

const { BASE, HORIZEN, MANTLE, ROLLUX, SCROLL, ZETACHAIN } = ChainID;
const testnetOnlyChains: ChainID[] = [
  BASE,
  HORIZEN,
  MANTLE,
  ROLLUX,
  SCROLL,
  ZETACHAIN,
];

export const isTestnetOnlyChain = (chainID: ChainID) =>
  testnetOnlyChains.includes(chainID);
