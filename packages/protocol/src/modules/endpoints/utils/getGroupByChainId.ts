import { ChainID } from 'modules/chains/types';

import { chainGroups } from '../constants/groups';

export const getGroupByChainId = (chainId?: ChainID) =>
  chainId
    ? chainGroups.find(({ chains }) => chains.includes(chainId))
    : undefined;

export const getGroupIdByChainId = (chainId?: ChainID) =>
  getGroupByChainId(chainId)?.id;
