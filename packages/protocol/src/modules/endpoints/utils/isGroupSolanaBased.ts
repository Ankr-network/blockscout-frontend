import { ChainGroupID } from '../types';
import { solanaGroups } from '../constants/solanaGroups';

export const isGroupSolanaBased = (id: ChainGroupID) =>
  solanaGroups.includes(id);
