import { ChainID } from 'domains/chains/types';

const { HORIZEN, SCROLL, ZETACHAIN } = ChainID;
const testnetOnlyChains: ChainID[] = [HORIZEN, SCROLL, ZETACHAIN];

export const isTestnetOnlyChain = (chainID: ChainID) =>
  testnetOnlyChains.includes(chainID);
