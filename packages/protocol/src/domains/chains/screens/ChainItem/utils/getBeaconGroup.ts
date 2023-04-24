import { EndpointGroup } from 'modules/endpoints/types';

export const getBeaconGroup = (group: EndpointGroup) => group.beacons?.[0];

export const getOpnodeGroup = (group: EndpointGroup) => group.opnodes?.[0];

export const getBeaconOrOpnodeGroup = (group: EndpointGroup) => {
  return getBeaconGroup(group) || getOpnodeGroup(group);
};
