import { MixpanelEvent } from '../const';
import { Web3ConnectEvent } from '../types';
import { track } from './track';

const event = MixpanelEvent.WEB3_CONNECT;

export const trackWeb3Connect = (properties: Web3ConnectEvent) =>
  track({ event, properties });
