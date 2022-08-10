import { ChainGroup, ChainGroupID } from '../types';
import { chainGroups } from './groups';

export const groupIDToGroupMap = chainGroups.reduce((map, group) => {
  map[group.id] = group;

  return map;
}, {} as Record<ChainGroupID, ChainGroup>);
