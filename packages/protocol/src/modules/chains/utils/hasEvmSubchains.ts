import { Chain } from '@ankr.com/chains-list';

import { flatChain } from './flatChain';
import { isEVMBased } from './isEVMBased';

export const hasEvmSubchains = (chain: Chain) => {
  return flatChain(chain).some(subchain => isEVMBased(subchain.id));
};
