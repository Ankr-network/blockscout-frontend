import { IProvider } from 'multirpc-sdk';

import { IEndpoint } from 'domains/nodeProviders/actions/fetchEndpoints';

export const hasLimit = (
  providerData: IProvider | null,
  endpoints: IEndpoint,
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
  providerData: IProvider | null,
  chainId?: string,
): boolean => {
  if (!providerData) return false;

  if (chainId) {
    return hasChain(providerData, chainId);
  }

  return true;
};
