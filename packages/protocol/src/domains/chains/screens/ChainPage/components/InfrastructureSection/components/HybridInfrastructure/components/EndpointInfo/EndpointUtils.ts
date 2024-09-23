import { IProvider } from 'multirpc-sdk';
import { Chain, ChainURL } from '@ankr.com/chains-list';

export const getChainById = (
  chains: Chain[],
  chainId: string,
): Chain | undefined => {
  const chain = chains?.find(item => {
    const isBeacon = Boolean(getChainById(item.beacons || [], chainId));

    return item.id === chainId || isBeacon;
  });

  return chain;
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

export const getUrls = (chain?: Chain) => {
  return [
    ...(chain?.urls || []),
    ...(chain?.extensions || []).flatMap<ChainURL>(({ urls }) => urls),
    ...(chain?.extenders || []).flatMap<ChainURL>(({ urls }) => urls),
  ].flatMap<string>(({ rpc, ws }) => (ws ? [rpc, ws] : [rpc]));
};

export interface ChainNameParams {
  chainId: string;
  privateChain?: Chain;
  publicChain?: Chain;
}

export const getChainName = ({
  chainId,
  privateChain,
  publicChain,
}: ChainNameParams) => {
  const { name } = privateChain || publicChain || {};

  return name || chainId;
};
