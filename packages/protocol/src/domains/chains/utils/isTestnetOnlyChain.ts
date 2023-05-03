import { ChainID } from 'domains/chains/types';

const { MANTLE, ROLLUX, ZETACHAIN } = ChainID;
const testnetOnlyChains: ChainID[] = [MANTLE, ROLLUX, ZETACHAIN];

export const isTestnetOnlyChain = (chainID: ChainID) =>
  testnetOnlyChains.includes(chainID);
