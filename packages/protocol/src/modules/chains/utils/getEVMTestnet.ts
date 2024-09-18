import { Chain } from '@ankr.com/chains-list';

import { flatChains } from 'modules/endpoints/utils/flatChains';
import { isEVMBased } from 'modules/chains/utils/isEVMBased';

export const getEVMTestnet = (testnets: Chain[]) =>
  testnets
    .flatMap(testnet => flatChains(testnet))
    .find(({ id }) => isEVMBased(id));
