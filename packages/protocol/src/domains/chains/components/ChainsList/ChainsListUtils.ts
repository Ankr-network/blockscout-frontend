import { BlockchainType } from 'multirpc-sdk';

import { ChainMap } from './ChainsListTypes';
import { IApiChain } from 'domains/chains/api/queryChains';
import { Chain } from 'domains/chains/types';

export const PERIOD = '24h';

export const formatChains = (data: IApiChain[]): Chain[] => {
  if (!Array.isArray(data) || data.length === 0) return [];

  return data.map(item => {
    const {
      coinName,
      extenders,
      extensions,
      frontChain = {},
      id,
      isArchive,
      name,
      totalRequests,
      type,
      urls,
      premiumOnly,
      isComingSoon,
      isMainnetPremiumOnly,
    } = item;

    return {
      coinName,
      extenders,
      extensions,
      frontChain,
      isArchive,
      name,
      totalRequests,
      type,
      urls,
      premiumOnly,
      isComingSoon,
      isMainnetPremiumOnly,
      ...frontChain,
      id,
    };
  });
};

export const extractCustomizedChains = (chains: Chain[]) =>
  chains.reduce<[Chain[], Chain[]]>(
    (acc, chain) => {
      if (chain.type === BlockchainType.Customized) {
        acc[1].push(chain);
      } else {
        acc[0].push(chain);
      }

      return acc;
    },
    [[], []],
  );

export const getChainId = ({
  id,
  frontChain: { id: frontChainId } = {},
}: Chain) => frontChainId || id;

export const getChainsDictionary = (allChains: IApiChain[]): ChainMap => {
  return formatChains(allChains).reduce<ChainMap>((map, chain) => {
    map[chain.id] = chain;

    return map;
  }, {});
};
