import { ChainGroup, EndpointGroup } from '../types';
import { evmGroups } from '../constants/evmGroups';

export const isGroupEvmBased = (group: EndpointGroup | ChainGroup) =>
  evmGroups.includes(group.id);
