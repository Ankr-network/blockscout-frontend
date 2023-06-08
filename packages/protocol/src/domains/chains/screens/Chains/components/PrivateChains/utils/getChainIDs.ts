import { Chain } from 'domains/chains/types';
import { getChainID } from './getChainID';

const flatChain = (chain: Chain): Chain[] => [
  chain,
  ...(chain.extenders ?? []).flatMap(flatChain),
  ...(chain.extensions ?? []).flatMap(flatChain),
  ...(chain.opnodes ?? []).flatMap(flatChain),
  ...(chain.testnets ?? []).flatMap(flatChain),
  ...(chain.devnets ?? []).flatMap(flatChain),
  ...(chain.beacons ?? []).flatMap(flatChain),
];

export const getChainIDs = (chain: Chain) => {
  const subchains = flatChain(chain);

  const ids = subchains.map(getChainID);

  return [...new Set(ids)];
};
