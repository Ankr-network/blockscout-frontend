import { Chain } from '../types';

export const flatChain = (chain: Chain): Chain[] => [
  chain,
  ...(chain.extensions?.flatMap(flatChain) ?? []),
  ...(chain.extenders?.flatMap(flatChain) ?? []),
  ...(chain.testnets?.flatMap(flatChain) ?? []),
  ...(chain.devnets?.flatMap(flatChain) ?? []),
  ...(chain.beacons?.flatMap(flatChain) ?? []),
  ...(chain.opnodes?.flatMap(flatChain) ?? []),
];
