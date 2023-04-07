import { ChainIdParams, getChainId } from './getChainId';
import { EndpointGroup } from 'modules/endpoints/types';

export interface StatsChainIdParams extends ChainIdParams {
  hasBeacon?: boolean;
}

const getBeaconChainId = (group: EndpointGroup) =>
  group.beacons?.[0].chains?.[0].id;

export const getStatsChainId = ({
  chainType,
  group,
  hasBeacon,
  publicChain,
}: StatsChainIdParams) => {
  const chainId = getChainId({ chainType, group, publicChain });
  const beaconChainId = getBeaconChainId(group) ?? chainId;

  return hasBeacon ? beaconChainId : chainId;
};
