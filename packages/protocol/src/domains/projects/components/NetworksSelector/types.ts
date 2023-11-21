import { EndpointGroup, GroupedEndpoints } from 'modules/endpoints/types';

export type NetworkName = keyof GroupedEndpoints;

export interface Network {
  name: NetworkName;
  groups: EndpointGroup[];
}
