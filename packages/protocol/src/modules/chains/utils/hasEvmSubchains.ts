import { flatChain } from './flatChain';
import { isEVMBased } from './isEVMBased';
import { Chain } from '../types';

export const hasEvmSubchains = (chain: Chain) => {
  return flatChain(chain).some(subchain => isEVMBased(subchain.id));
};
