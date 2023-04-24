import { BlockchainType } from 'multirpc-sdk';

import { ChainMap } from './ChainsListTypes';
import { Chain } from 'domains/chains/types';

export const PERIOD = '24h';

export const extractCustomizedChains = (chains: Chain[]) => {
  return chains.reduce<[Chain[], Chain[]]>(
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
};

export const getChainsDictionary = (allChains: Chain[]): ChainMap => {
  return allChains.reduce<ChainMap>((map, chain) => {
    map[chain.id] = chain;

    return map;
  }, {});
};
