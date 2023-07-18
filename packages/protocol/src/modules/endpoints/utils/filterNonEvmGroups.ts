import { EndpointGroup, nonEvmGroupsList } from '../types';

export const filterNonEvmGroups = (groups: EndpointGroup[]) =>
  groups.filter(group => !nonEvmGroupsList.includes(group.id));
