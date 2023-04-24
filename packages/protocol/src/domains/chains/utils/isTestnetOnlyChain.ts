import { ChainID } from 'domains/chains/types';

const { MANTLE, ROLLUX, SUI, ZETACHAIN } = ChainID;
const testnetOnlyChains: ChainID[] = [MANTLE, ROLLUX, SUI, ZETACHAIN];

export const isTestnetOnlyChain = (chainID: ChainID) =>
  testnetOnlyChains.includes(chainID);
