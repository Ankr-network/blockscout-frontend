import { ChainID } from 'domains/chains/types';

const { MANTLE, ROLLUX, ZETACHAIN, SCROLL } = ChainID;
const testnetOnlyChains: ChainID[] = [MANTLE, ROLLUX, ZETACHAIN, SCROLL];

export const isTestnetOnlyChain = (chainID: ChainID) =>
  testnetOnlyChains.includes(chainID);
