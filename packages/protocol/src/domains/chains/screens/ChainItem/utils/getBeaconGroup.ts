import { EndpointGroup } from 'modules/endpoints/types';

export const getBeaconGroup = (group: EndpointGroup) => group.beacons?.[0];
