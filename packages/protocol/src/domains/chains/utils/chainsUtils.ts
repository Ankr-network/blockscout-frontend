import { ChainID } from 'modules/chains/types';

const SUBNETS_CHAINS_LIST = [ChainID.SECRET, ChainID.AVALANCHE];

export const checkAvalancheOrSecretAndGetChainId = (chainId: ChainID) => {
  if (chainId.includes(ChainID.AVALANCHE_FUJI)) {
    return ChainID.AVALANCHE_FUJI;
  }
  return SUBNETS_CHAINS_LIST.find(item => chainId.includes(item)) ?? chainId;
};
