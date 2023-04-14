import { ChainID } from 'modules/chains/types';
import { EndpointGroup } from 'modules/endpoints/types';

export const getBeaconGroup = (group: EndpointGroup) => group.beacons?.[0];

export const getOpnodeGroup = (group: EndpointGroup) => {
  if (group.opnodes?.[0]) return group.opnodes?.[0];

  const id = group.chains[0]?.id;

  return id === ChainID.ROLLUX_TESTNET
    ? // @ts-ignore
      (group.chains[0]?.opnodes?.[0] as EndpointGroup)
    : undefined;
};

export const getBeaconOrOpnodeGroup = (group: EndpointGroup) => {
  return getBeaconGroup(group) || getOpnodeGroup(group);
};
