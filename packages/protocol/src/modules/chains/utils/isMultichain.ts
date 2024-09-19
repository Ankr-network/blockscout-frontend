import { ChainID } from '@ankr.com/chains-list';

export const isMultichain = (chainId: ChainID) =>
  chainId === ChainID.MULTICHAIN;
