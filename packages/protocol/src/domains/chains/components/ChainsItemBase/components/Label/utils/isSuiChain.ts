import { ChainID } from 'domains/chains/types';

export const isSuiChain = (chainId: ChainID) => chainId === ChainID.SUI;
