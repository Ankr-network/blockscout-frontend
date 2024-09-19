import { createContext } from 'react';

import { EndpointGroup } from 'modules/endpoints/types';

export enum ChainProtocol {
  Beacon = 'beacon',
  Opnode = 'opnode',
}

export interface ChainProtocolContextValue {
  protocolGroup?: EndpointGroup;
  isChainProtocolSwitchEnabled: boolean;
  toggleChainProtocolSwitch: () => void;
  chainProtocol?: ChainProtocol;
}

export const ChainProtocolContext = createContext<ChainProtocolContextValue>({
  protocolGroup: undefined,
  isChainProtocolSwitchEnabled: false,
  toggleChainProtocolSwitch: () => {},
});
