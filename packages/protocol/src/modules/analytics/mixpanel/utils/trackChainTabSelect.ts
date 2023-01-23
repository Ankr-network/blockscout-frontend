import { MixpanelEvent } from '../const';
import { SelectChainTabEvent } from '../types';
import { track } from './track';

const event = MixpanelEvent.SELECT_CHAIN_TAB;

export const trackChainTabSelect = (properties: SelectChainTabEvent) =>
  track({ event, properties });
