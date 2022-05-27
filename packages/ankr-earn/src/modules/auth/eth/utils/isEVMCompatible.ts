import { TChainId } from 'modules/auth/common/types';

/**
 *  Note: Please to add additional checks for different networks with the same types
 */
export const isEVMCompatible = (chainId?: TChainId): chainId is number =>
  typeof chainId === 'number';
