import { IApiChain } from 'domains/chains/api/queryChains';
import { flatChains } from 'modules/endpoints/utils/flatChains';
import { isEVMBased } from 'modules/chains/utils/isEVMBased';

export const getEVMTestnet = (testnets: IApiChain[]) =>
  testnets
    .flatMap(testnet => flatChains(testnet))
    .find(({ id }) => isEVMBased(id));
