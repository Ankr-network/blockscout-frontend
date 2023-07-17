import { ChainIdParams, getChainId } from './getChainId';
import { EndpointGroup } from 'modules/endpoints/types';
import { ChainID } from 'domains/chains/types';
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
  chainSubType,
  group,
  isChainProtocolSwitchEnabled,
  publicChain,
  chainProtocol,
}: StatsChainIdParams) => {
  const keepEVMChainID =
    publicChain.id === ChainID.ZETACHAIN || publicChain.id === ChainID.HORIZEN;

  const chainId = getChainId({
    chainType,
    chainSubType,
    group,
    keepEVMChainID,
    publicChain,
  });

  if (isChainProtocolSwitchEnabled) {
    return getProtocolChainId(group, chainProtocol) ?? chainId;
  }

  return chainId;
};
