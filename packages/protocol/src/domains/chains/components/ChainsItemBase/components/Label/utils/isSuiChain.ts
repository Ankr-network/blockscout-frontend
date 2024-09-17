import { ChainID } from '@ankr.com/chains-list';

export const isSuiChain = (chainId: ChainID) => chainId === ChainID.SUI;
