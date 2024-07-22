import { ChainID } from '../types';

export const isMultichain = (chainId: ChainID) =>
  chainId === ChainID.MULTICHAIN;
