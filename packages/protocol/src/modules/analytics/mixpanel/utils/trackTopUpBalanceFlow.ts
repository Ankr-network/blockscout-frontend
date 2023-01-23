import { MixpanelEvent } from '../const';
import { TopUpBalanceFlowEvent } from '../types';
import { track } from './track';

const event = MixpanelEvent.TOP_UP_BALANCE_FLOW;

export const trackTopUpBalanceFlow = (properties: TopUpBalanceFlowEvent) =>
  track({ event, properties });
