import { EndpointGroup } from '../types';
import { evmGroups } from '../constants/evmGroups';

export const isGroupEvmBased = (group: EndpointGroup) =>
  evmGroups.includes(group.id);
