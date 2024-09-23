import { ChainID } from '@ankr.com/chains-list';

import { EndpointGroup } from 'modules/endpoints/types';
import { ChainIdParams, getChainId } from 'modules/chains/utils/getChainId';

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
  chainProtocol,
  chainSubType,
  chainType,
  group,
  isChainProtocolSwitchEnabled,
  publicChain,
}: StatsChainIdParams) => {
  const keepEVMChainID =
    publicChain.id === ChainID.ZETACHAIN ||
    publicChain.id === ChainID.HORIZEN ||
    publicChain.id === ChainID.BERACHAIN ||
    publicChain.id === ChainID.KAVA;

  const withExceptions =
    publicChain.id === ChainID.HORIZEN || publicChain.id === ChainID.TENET;

  const chainId = getChainId({
    chainType,
    chainSubType,
    group,
    keepEVMChainID,
    publicChain,
    withExceptions,
  });

  if (isChainProtocolSwitchEnabled) {
    return getProtocolChainId(group, chainProtocol) || chainId;
  }

  return chainId;
};
