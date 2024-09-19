import { EndpointGroup } from 'modules/endpoints/types';

import { getBeaconOrOpnodeGroup } from './getBeaconGroup';

export interface EndpointsGroupParams {
  group: EndpointGroup;
  isChainProtocolSwitchEnabled?: boolean;
}

export const getEndpointsGroup = ({
  group,
  isChainProtocolSwitchEnabled,
}: EndpointsGroupParams) => {
  if (!isChainProtocolSwitchEnabled) {
    return group;
  }

  return getBeaconOrOpnodeGroup(group) || group;
};
