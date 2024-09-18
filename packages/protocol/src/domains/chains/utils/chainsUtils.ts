import { ChainID } from '@ankr.com/chains-list';

export const getPublicUrl = (url: string) =>
  url.substring(0, url.lastIndexOf('/'));

const CHAINS_WITH_SUBNETS = [
  ChainID.SECRET,
  ChainID.AVALANCHE,
  ChainID.FLARE,
  ChainID.BTC,
];

export const checkChainWithSubnetsAndGetChainId = (chainId?: ChainID) => {
  if (!chainId) return chainId;

  if (chainId.includes(ChainID.AVALANCHE_FUJI)) {
    return ChainID.AVALANCHE_FUJI;
  }

  return CHAINS_WITH_SUBNETS.find(item => chainId.includes(item)) || chainId;
};
