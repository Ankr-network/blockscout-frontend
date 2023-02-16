import { ChainID } from 'modules/chains/types';

export const isSuiChain = (chainId: ChainID) => chainId === ChainID.SUI;
