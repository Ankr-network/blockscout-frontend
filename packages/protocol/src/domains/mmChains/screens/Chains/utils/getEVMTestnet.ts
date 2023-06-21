import { flatChains } from 'modules/endpoints/utils/flatChains';
import { isEVMBased } from 'domains/chains/utils/isEVMBased';
import { Chain } from 'domains/chains/types';

export const getEVMTestnet = (testnets: Chain[]) =>
  testnets
    .flatMap(testnet => flatChains(testnet))
    .find(({ id }) => isEVMBased(id));