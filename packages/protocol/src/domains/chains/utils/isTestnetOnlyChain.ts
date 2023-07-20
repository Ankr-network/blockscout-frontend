import { ChainID } from 'domains/chains/types';

const { BASE, HORIZEN, SCROLL, ZETACHAIN } = ChainID;
const testnetOnlyChains: ChainID[] = [BASE, HORIZEN, SCROLL, ZETACHAIN];

export const isTestnetOnlyChain = (chainID: ChainID) =>
  testnetOnlyChains.includes(chainID);
