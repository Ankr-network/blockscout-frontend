import { useCallback, useEffect, useMemo, useState } from 'react';
import { ChainID } from '@ankr.com/chains-list';

import { EndpointGroup } from 'modules/endpoints/types';
import { isBeacon, isOpnode } from 'domains/chains/utils/isBeacon';

import { getBeaconGroup, getOpnodeGroup } from '../utils/getBeaconGroup';
import {
  ChainProtocolContextValue,
  ChainProtocol,
} from '../constants/ChainProtocolContext';

const getChainProtocol = (
  beaconGroup?: EndpointGroup,
  opnodeGroup?: EndpointGroup,
) => {
  if (beaconGroup) return ChainProtocol.Beacon;

  if (opnodeGroup) return ChainProtocol.Opnode;

  return undefined;
};

export interface ChainProtocolParams {
  group: EndpointGroup;
  netId?: ChainID;
}

export const useChainProtocol = ({
  group,
  netId,
}: ChainProtocolParams): ChainProtocolContextValue => {
  const [isChainProtocolSwitchEnabled, setChainTypeSwitch] = useState(
    isBeacon(netId) || isOpnode(netId),
  );

  const toggleChainProtocolSwitch = useCallback(
    () => setChainTypeSwitch(value => !value),
    [],
  );

  const beaconGroup = useMemo(() => getBeaconGroup(group), [group]);
  const opnodeGroup = useMemo(() => getOpnodeGroup(group), [group]);
  const protocolGroup = beaconGroup || opnodeGroup;
  const chainProtocol = useMemo(
    () => getChainProtocol(beaconGroup, opnodeGroup),
    [beaconGroup, opnodeGroup],
  );

  useEffect(() => {
    if (isChainProtocolSwitchEnabled && !protocolGroup) {
      toggleChainProtocolSwitch();
    }
  }, [protocolGroup, toggleChainProtocolSwitch, isChainProtocolSwitchEnabled]);

  return {
    protocolGroup,
    isChainProtocolSwitchEnabled,
    toggleChainProtocolSwitch,
    chainProtocol,
  };
};
