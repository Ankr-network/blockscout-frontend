import { ChainID } from 'domains/chains/types';
import { chainGroups } from '../constants/groups';

export const getGroupIdByChainId = (chainId?: ChainID) =>
  chainId
    ? chainGroups.find(({ chains }) => chains.includes(chainId))?.id
    : undefined;
