import { ChainID } from 'domains/chains/types';

const { SCROLL, ZETACHAIN } = ChainID;
const testnetOnlyChains: ChainID[] = [SCROLL, ZETACHAIN];

export const isTestnetOnlyChain = (chainID: ChainID) =>
  testnetOnlyChains.includes(chainID);
