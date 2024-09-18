import { Chain, ChainPath } from '@ankr.com/chains-list';

import { getUniqueArray } from 'modules/common/utils/getUniqueArray';

import { clearPathPrefix } from './clearPathPrefix';

export const getAllPathsByChain = (chain: Chain): ChainPath[] =>
  getUniqueArray([
    ...(chain.paths?.map(clearPathPrefix) || []),
    ...(chain.extensions?.flatMap(getAllPathsByChain) || []),
    ...(chain.extenders?.flatMap(getAllPathsByChain) || []),
    ...(chain.testnets?.flatMap(getAllPathsByChain) || []),
    ...(chain.devnets?.flatMap(getAllPathsByChain) || []),
    ...(chain.beacons?.flatMap(getAllPathsByChain) || []),
    ...(chain.opnodes?.flatMap(getAllPathsByChain) || []),
  ]);
