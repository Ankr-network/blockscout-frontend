import { chainGroups } from '../constants/groups';
import { ChainGroupID } from '../types';

export const getGroupById = (id: ChainGroupID) =>
  chainGroups.find(group => group.id === id);
