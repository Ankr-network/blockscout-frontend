import { chainGroups } from '../constants/groups';

export const getGroupIdByChainId = (chainId?: string) =>
  chainId
    ? chainGroups.find(({ chains }) => chains.includes(chainId))?.id
    : undefined;
