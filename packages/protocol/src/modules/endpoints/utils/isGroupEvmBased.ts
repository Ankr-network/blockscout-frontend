import { evmGroups } from '../constants/evmGroups';
import { EndpointGroup } from '../types';

export const isGroupEvmBased = (group: EndpointGroup) =>
  evmGroups.includes(group.id);
