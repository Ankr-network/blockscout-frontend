import { ChainID } from '@ankr.com/chains-list';

import { chainGroups } from '../constants/groups';

export const getGroupByChainId = (chainId?: ChainID) =>
  chainId
    ? chainGroups.find(({ chains }) => chains.includes(chainId))
    : undefined;

export const getGroupIdByChainId = (chainId?: ChainID) =>
  getGroupByChainId(chainId)?.id;
