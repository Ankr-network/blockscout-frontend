import { Chain } from 'modules/chains/types';

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
