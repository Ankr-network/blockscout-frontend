import { ChainIdParams, getChainId } from './getChainId';
import { EndpointGroup } from 'modules/endpoints/types';
import { ChainProtocol } from '../../../constants/ChainProtocolContext';

export interface StatsChainIdParams extends ChainIdParams {
  isChainProtocolSwitchEnabled?: boolean;
  chainProtocol?: ChainProtocol;
}

const getProtocolChainId = (group: EndpointGroup, type?: ChainProtocol) => {
  if (type === ChainProtocol.Beacon) {
    return group.beacons?.[0].chains?.[0].id;
  }

  if (type === ChainProtocol.Opnode) {
    return group.opnodes?.[0].chains?.[0].id;
  }

  return undefined;
};

export const getStatsChainId = ({
  chainType,
  group,
  isChainProtocolSwitchEnabled,
  publicChain,
  chainProtocol,
}: StatsChainIdParams) => {
  const chainId = getChainId({ chainType, group, publicChain });

  if (isChainProtocolSwitchEnabled) {
    return getProtocolChainId(group, chainProtocol) ?? chainId;
  }

  return chainId;
};
