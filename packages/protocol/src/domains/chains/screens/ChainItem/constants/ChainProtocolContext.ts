import { createContext } from 'react';

import { EndpointGroup } from 'modules/endpoints/types';
import { IApiChain } from 'domains/chains/api/queryChains';

export enum ChainProtocol {
  Beacon = 'beacon',
  Opnode = 'opnode',
}

export interface ChainProtocolContextValue {
  protocolGroup?: EndpointGroup | IApiChain;
  isChainProtocolSwitchEnabled: boolean;
  toggleChainProtocolSwitch: () => void;
  chainProtocol?: ChainProtocol;
}

export const ChainProtocolContext = createContext<ChainProtocolContextValue>({
  protocolGroup: undefined,
  isChainProtocolSwitchEnabled: false,
  toggleChainProtocolSwitch: () => {},
});
