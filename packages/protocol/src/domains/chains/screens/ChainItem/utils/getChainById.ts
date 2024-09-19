import { Chain } from '@ankr.com/chains-list';

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
