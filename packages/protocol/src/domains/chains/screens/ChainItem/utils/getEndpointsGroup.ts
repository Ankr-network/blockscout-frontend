import { EndpointGroup } from 'modules/endpoints/types';
import { getBeaconGroup } from './getBeaconGroup';

export interface EndpointsGroupParams {
  group: EndpointGroup;
  hasBeacon?: boolean;
}

export const getEndpointsGroup = ({
  group,
  hasBeacon,
}: EndpointsGroupParams) => {
  if (!hasBeacon) {
    return group;
  }

  return getBeaconGroup(group) ?? group;
};
