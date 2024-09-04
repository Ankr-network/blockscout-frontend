import { flatChains } from 'modules/endpoints/utils/flatChains';
import { isEVMBased } from 'modules/chains/utils/isEVMBased';
import { Chain } from 'modules/chains/types';

export const getEVMTestnet = (testnets: Chain[]) =>
  testnets
    .flatMap(testnet => flatChains(testnet))
    .find(({ id }) => isEVMBased(id));
