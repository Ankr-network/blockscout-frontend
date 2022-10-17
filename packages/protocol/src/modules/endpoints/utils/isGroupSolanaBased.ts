import { EndpointGroup } from '../types';
import { solanaGroups } from '../constants/solanaGroups';

export const isGroupSolanaBased = ({ id }: EndpointGroup) =>
  solanaGroups.includes(id);
