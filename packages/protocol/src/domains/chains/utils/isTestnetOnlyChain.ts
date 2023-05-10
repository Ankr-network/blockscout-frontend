import { ChainID } from 'domains/chains/types';

const { MANTLE, ROLLUX, ZETACHAIN, BASE, SCROLL } = ChainID;
const testnetOnlyChains: ChainID[] = [MANTLE, ROLLUX, ZETACHAIN, BASE, SCROLL];

export const isTestnetOnlyChain = (chainID: ChainID) =>
  testnetOnlyChains.includes(chainID);
