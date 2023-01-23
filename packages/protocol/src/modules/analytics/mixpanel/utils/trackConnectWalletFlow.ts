import { ConnectWalletFlowEvent } from '../types';
import { MixpanelEvent } from '../const';
import { track } from './track';

const event = MixpanelEvent.CONNECT_WALLET_FLOW;

export const trackConnectWalletFlow = (properties: ConnectWalletFlowEvent) =>
  track({ event, properties });
