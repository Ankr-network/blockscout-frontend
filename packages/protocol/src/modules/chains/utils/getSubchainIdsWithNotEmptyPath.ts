import { Chain, ChainID } from '@ankr.com/chains-list';

import { getUniqueArray } from 'modules/common/utils/getUniqueArray';

export const getSubchainIdsWithNotEmptyPath = (chain: Chain): ChainID[] => {
  if (!chain.paths?.length) {
    return getUniqueArray([
      ...(chain.extensions?.flatMap(getSubchainIdsWithNotEmptyPath) || []),
      ...(chain.extenders?.flatMap(getSubchainIdsWithNotEmptyPath) || []),
      ...(chain.testnets?.flatMap(getSubchainIdsWithNotEmptyPath) || []),
      ...(chain.devnets?.flatMap(getSubchainIdsWithNotEmptyPath) || []),
      ...(chain.beacons?.flatMap(getSubchainIdsWithNotEmptyPath) || []),
      ...(chain.opnodes?.flatMap(getSubchainIdsWithNotEmptyPath) || []),
    ]);
  }

  return getUniqueArray([
    chain.id,
    ...(chain.extensions?.flatMap(getSubchainIdsWithNotEmptyPath) || []),
    ...(chain.extenders?.flatMap(getSubchainIdsWithNotEmptyPath) || []),
    ...(chain.testnets?.flatMap(getSubchainIdsWithNotEmptyPath) || []),
    ...(chain.devnets?.flatMap(getSubchainIdsWithNotEmptyPath) || []),
    ...(chain.beacons?.flatMap(getSubchainIdsWithNotEmptyPath) || []),
    ...(chain.opnodes?.flatMap(getSubchainIdsWithNotEmptyPath) || []),
  ]);
};
