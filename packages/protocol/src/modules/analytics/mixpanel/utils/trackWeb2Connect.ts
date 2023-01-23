import { MixpanelEvent } from '../const';
import { Web2ConnectEvent } from '../types';
import { track } from './track';

const event = MixpanelEvent.WEB2_CONNECT;

export const trackWeb2Connect = (properties: Web2ConnectEvent) =>
  track({ event, properties });
