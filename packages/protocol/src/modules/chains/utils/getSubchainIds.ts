import { Chain, ChainID } from '@ankr.com/chains-list';

import { getUniqueArray } from 'modules/common/utils/getUniqueArray';

export const getSubchainIds = (chain: Chain): ChainID[] =>
  getUniqueArray([
    chain.id,
    ...(chain.extensions?.flatMap(getSubchainIds) || []),
    ...(chain.extenders?.flatMap(getSubchainIds) || []),
    ...(chain.testnets?.flatMap(getSubchainIds) || []),
    ...(chain.devnets?.flatMap(getSubchainIds) || []),
    ...(chain.beacons?.flatMap(getSubchainIds) || []),
    ...(chain.opnodes?.flatMap(getSubchainIds) || []),
  ]);
