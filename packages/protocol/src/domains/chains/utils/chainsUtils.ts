import { ChainID } from 'domains/chains/types';

export const getPublicUrl = (url: string) =>
  url.substring(0, url.lastIndexOf('/'));

const SUBNETS_CHAINS_LIST = [ChainID.SECRET, ChainID.AVALANCHE];

export const checkAvalancheOrSecretAndGetChainId = (chainId?: ChainID) => {
  if (!chainId) {
    return chainId;
  }

  if (chainId.includes(ChainID.AVALANCHE_FUJI)) {
    return ChainID.AVALANCHE_FUJI;
  }

  return SUBNETS_CHAINS_LIST.find(item => chainId.includes(item)) ?? chainId;
};
