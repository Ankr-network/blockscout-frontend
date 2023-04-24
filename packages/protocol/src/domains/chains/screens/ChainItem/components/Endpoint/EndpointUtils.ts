import { IProvider } from 'multirpc-sdk';

import { Endpoints } from 'domains/infrastructure/actions/fetchEndpoints';
import { Chain } from 'domains/chains/types';

export const getChainById = (
  chains: Chain[],
  chainId: string,
): Chain | undefined => {
  const chain = chains?.find(item => {
    const isBeacon = Boolean(getChainById(item.beacons ?? [], chainId));

    return item.id === chainId || isBeacon;
  });

  return chain;
};

export const hasLimit = (
  providerData: IProvider | null,
  endpoints: Endpoints,
) => {
  if (typeof providerData === 'string' || !providerData) return false;

  let endpointsCount = 0;

  Object.keys(endpoints).forEach(key => {
    endpointsCount += endpoints[key].length;
  });

  return endpointsCount >= providerData.limit;
};

export const getLimit = (providerData: IProvider | null): number => {
  if (typeof providerData === 'string' || !providerData) return 0;

  return providerData.limit;
};

const hasChain = (providerData: IProvider, chainId: string) => {
  if (typeof providerData === 'string') return false;

  const { blockchains = [] } = providerData;

  // we can add all blockchains
  if (blockchains.length === 0) return true;

  return blockchains.includes(chainId);
};

export const canAddEndpoint = (
  providerData: IProvider | null | undefined,
  chainId?: string,
): boolean => {
  if (!providerData) return false;

  if (chainId) {
    return hasChain(providerData, chainId);
  }

  return true;
};
