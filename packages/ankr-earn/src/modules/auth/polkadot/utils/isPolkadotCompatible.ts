import { TChainId } from 'modules/auth/common/types';

/**
 *  Note: Please to add additional checks for different networks with the same types
 */
export const isPolkadotCompatible = (chainId?: TChainId): chainId is string =>
  typeof chainId === 'string';
