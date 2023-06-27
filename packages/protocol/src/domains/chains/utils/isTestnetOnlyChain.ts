import { ChainID } from 'domains/chains/types';

const { BASE, HORIZEN, MANTLE, SCROLL, ZETACHAIN } = ChainID;
const testnetOnlyChains: ChainID[] = [BASE, HORIZEN, MANTLE, SCROLL, ZETACHAIN];

export const isTestnetOnlyChain = (chainID: ChainID) =>
  testnetOnlyChains.includes(chainID);
